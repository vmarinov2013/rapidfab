pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            when {
                expression {
                    sh(returnStdout: true, script: 'docker images -q authentise/mes').trim() == ''
                }
            }
            steps {
                sh 'docker build -t authentise/mes .'
            }
        }
        stage('Docker container start') {
            steps {
                sh 'docker run -d --name rapidfab --env BROWSER=PhantomJS2 -v $(pwd):/src -v $HOME/.aws:/root/.aws -d authentise/mes sleep infinity'
                sh 'docker start rapidfab'
            }
        }
        stage('Test') {
            steps {
                sh 'docker exec rapidfab ln -s /node_modules /src/node_modules'
                sh 'docker exec rapidfab npm run test:junit'
                sh 'docker exec rapidfab sh -c "npm run lint:js -- . --format checkstyle --output-file /src/eslintoutput.xml || true"'
                sh 'docker cp rapidfab:/src/eslintoutput.xml eslintoutput.xml'
                step([
                    $class            : 'CheckStylePublisher',
                    canRunOnFailed    : true,
                    defaultEncoding   : '',
                    healthy           : '100',
                    pattern           : '**/eslintoutput.xml',
                    unHealthy         : '90',
                    useStableBuildAsReference: true
                ])
            }
        }
        stage('Build') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["DEV_COMMIT=${sh(returnStdout: true, script: 'echo $GITDESCRIBE | grep \'\\-g\' | cat')}"]) {
                        sh 'rm -Rf dist/*'
                        sh 'mkdir -p dist'
                        sh 'rm -Rf rapidfab-*.tgz'
                        sh 'if [ -z $DEV_COMMIT ]; then docker exec -e NODE_ENV=production rapidfab npm run build; else docker exec -e NODE_ENV=development rapidfab npm run build; fi'
                        sh 'docker exec rapidfab chmod -f a+rw -R /src/dist'
                        sh 'tar -czvf rapidfab-$GITDESCRIBE.tgz dist'
                        archiveArtifacts artifacts: 'rapidfab-*.tgz', fingerprint: true
                    }
                }
            }
        }
        stage('Publish') {
            when {
                branch 'master'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["DEV_COMMIT=${sh(returnStdout: true, script: 'echo $GITDESCRIBE | grep \'\\-g\' | cat')}"]) {
                        sh 'if [ -z $DEV_COMMIT ]; then docker exec rapidfab npm run publish -- --region us-west-2 --bucket rapidfab.authentise.com --cloudfront EOPZ6L10IQ06S; else docker exec rapidfab npm run publish -- --region us-west-2 --bucket rapidfab.dev-auth.com --cloudfront E204AX3Y5WR2B4; fi'
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'docker stop rapidfab'
            sh 'docker rm rapidfab'
        }
    }
}

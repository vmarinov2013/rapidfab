pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker build -t authentise/rapidfab:$GITDESCRIBE .'
                }
            }
        }
        stage('Docker container start') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker run -d --name rapidfab --env BROWSER=PhantomJS2 -v $HOME/.aws:/root/.aws -d authentise/rapidfab:$GITDESCRIBE sleep infinity'
                    sh 'docker start rapidfab'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'docker exec rapidfab npm run test:junit'
                sh 'docker exec rapidfab sh -c "npm run lint:js -- --fix --format checkstyle --output-file /src/eslintoutput.xml"'
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
                        withEnv(["COMMIT_HASH=${sh(returnStdout: true, script: 'git rev-parse HEAD')}"]) {
                            sh 'rm -Rf rapidfab-*.tgz'
                            sh 'if [ -z $DEV_COMMIT ]; then docker exec -e NODE_ENV=production rapidfab npm run build; else docker exec -e NODE_ENV=development rapidfab npm run build; fi'
                        }
                    }
                }
            }
        }
        stage('Upload') {
            when {
                branch 'master'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["DEV_COMMIT=${sh(returnStdout: true, script: 'echo $GITDESCRIBE | grep \'\\-g\' | cat')}"]) {
                        sh 'docker push authentise/rapidfab:$GITDESCRIBE'
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            agent {
                label 'salted'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'build-complete rapidfab authentise/rapidfab:$GITDESCRIBE'
                }
            }
        }
    }
    post {
        always {
            sh(returnStdout: true, script: 'docker exec rapidfab sh -c "rm -Rf node_modules test_results"')
            sh(returnStdout: true, script: 'docker stop rapidfab')
            sh(returnStdout: true, script: 'docker rm rapidfab')
            sh(returnStdout: true, script: 'rm -Rf $WORKSPACE/* $WORKSPACE/.git')
        }
    }
}

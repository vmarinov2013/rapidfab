import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  pao: [
    'memberships',
    'sessions',
    'users'
  ],
  wyatt: [
    'location',
    'post-processor-type',
    'post-processor',
    'manufacturer',
    'material',
    'stock',
    'order',
    'print',
    'run'
  ]
}

export default MakeApi(RESOURCES)

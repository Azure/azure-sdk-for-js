targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'acctest0001'
  location: 'westeurope'
  properties: {
    disableLocalAuth: false
    publicNetworkAccess: 'Enabled'
    zoneRedundant: false
  }
  sku: {
    capacity: 0
    name: 'Standard'
    tier: 'Standard'
  }
}

resource queue 'Microsoft.ServiceBus/namespaces/queues@2026-01-01' = {
  name: 'acctest0001'
  parent: namespace
  properties: {
    deadLetteringOnMessageExpiration: false
    enableBatchedOperations: true
    enableExpress: false
    enablePartitioning: true
    maxDeliveryCount: 10
    maxSizeInMegabytes: 81920
    requiresDuplicateDetection: false
    requiresSession: false
    status: 'Active'
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/queues/authorizationRules@2026-01-01' = {
  name: 'acctest0001'
  parent: queue
  properties: {
    rights: [
      'Send'
    ]
  }
}

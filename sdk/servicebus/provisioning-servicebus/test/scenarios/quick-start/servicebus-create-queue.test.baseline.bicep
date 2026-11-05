targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'quickstart-servicebus'
  location: 'eastus'
  properties: {}
  sku: {
    name: 'Standard'
  }
}

resource queue 'Microsoft.ServiceBus/namespaces/queues@2026-01-01' = {
  name: 'quickstart-queue'
  parent: namespace
  properties: {
    lockDuration: 'PT5M'
    maxSizeInMegabytes: 1024
    requiresDuplicateDetection: false
    requiresSession: false
    defaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S'
    deadLetteringOnMessageExpiration: false
    duplicateDetectionHistoryTimeWindow: 'PT10M'
    maxDeliveryCount: 10
    autoDeleteOnIdle: 'P10675199DT2H48M5.4775807S'
    enablePartitioning: false
    enableExpress: false
  }
}

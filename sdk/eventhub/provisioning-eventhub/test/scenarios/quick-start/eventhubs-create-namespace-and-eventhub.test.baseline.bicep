targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickprojectns'
  location: 'eastus'
  properties: {
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
  }
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'quickproject'
  parent: namespace
  properties: {
    messageRetentionInDays: 7
    partitionCount: 1
  }
}

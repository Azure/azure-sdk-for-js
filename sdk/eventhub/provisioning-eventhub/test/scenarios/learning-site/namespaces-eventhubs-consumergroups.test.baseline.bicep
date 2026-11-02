targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'acctest0001'
  location: 'westeurope'
  properties: {
    disableLocalAuth: false
    isAutoInflateEnabled: false
    publicNetworkAccess: 'Enabled'
    zoneRedundant: false
  }
  sku: {
    capacity: 1
    name: 'Standard'
    tier: 'Standard'
  }
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'acctest0001'
  parent: namespace
  properties: {
    messageRetentionInDays: 1
    partitionCount: 2
    status: 'Active'
  }
}

resource consumergroup 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2026-01-01' = {
  name: 'acctest0001'
  parent: eventhub
  properties: {
    userMetadata: ''
  }
}

targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'wps-learn-replica'
}

resource replica 'Microsoft.SignalRService/webPubSub/replicas@2025-12-01-preview' = {
  name: 'learn-replica'
  parent: webPubSub
  location: 'westus'
  properties: {
    regionEndpointEnabled: 'Enabled'
    resourceStopped: 'false'
  }
  sku: {
    capacity: 1
    name: 'Standard_S1'
    tier: 'Standard'
  }
  tags: {
    source: 'learn'
  }
}

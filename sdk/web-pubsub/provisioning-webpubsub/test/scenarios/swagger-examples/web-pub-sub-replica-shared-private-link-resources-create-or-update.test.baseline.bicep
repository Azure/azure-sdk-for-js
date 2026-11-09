targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'myWebPubSubService'
}

resource replica 'Microsoft.SignalRService/webPubSub/replicas@2025-12-01-preview' = {
  name: 'myWebPubSubService-eastus'
  parent: webPubSub
  location: 'eastus'
}

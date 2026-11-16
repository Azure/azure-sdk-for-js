targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'myWebPubSubService'
}

resource privateEndpointConnection 'Microsoft.SignalRService/webPubSub/privateEndpointConnections@2025-12-01-preview' = {
  name: 'mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e'
  parent: webPubSub
}

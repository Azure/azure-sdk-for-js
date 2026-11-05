targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'myWebPubSubService'
}

resource replica 'Microsoft.SignalRService/webPubSub/replicas@2025-12-01-preview' existing = {
  name: 'myWebPubSubService-eastus'
  parent: webPubSub
}

resource sharedPrivateLinkResource 'Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources@2025-12-01-preview' = {
  name: 'upstream'
  parent: replica
  properties: {
    groupId: 'sites'
    privateLinkResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Web/sites/myWebApp'
    requestMessage: 'Please approve'
  }
}

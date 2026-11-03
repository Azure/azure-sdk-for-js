targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'wps-learn-replica-link'
}

resource replica 'Microsoft.SignalRService/webPubSub/replicas@2025-12-01-preview' existing = {
  name: 'learn-replica'
  parent: webPubSub
}

resource sharedPrivateLinkResource 'Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources@2025-12-01-preview' = {
  name: 'learn-link'
  parent: replica
  properties: {
    fqdns: [
      'learn.example.com'
    ]
    groupId: 'sites'
    privateLinkResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Web/sites/learn-app'
    requestMessage: 'Please approve'
  }
}

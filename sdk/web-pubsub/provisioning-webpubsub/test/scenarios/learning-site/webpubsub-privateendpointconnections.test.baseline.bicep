targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'wps-learn-pec'
}

resource privateEndpointConnection 'Microsoft.SignalRService/webPubSub/privateEndpointConnections@2025-12-01-preview' = {
  name: 'learn-pec'
  parent: webPubSub
  properties: {
    privateEndpoint: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/privateEndpoints/learn-pec'
    }
    privateLinkServiceConnectionState: {
      actionsRequired: 'None'
      description: 'Approved for the learning-site baseline'
      status: 'Approved'
    }
  }
}

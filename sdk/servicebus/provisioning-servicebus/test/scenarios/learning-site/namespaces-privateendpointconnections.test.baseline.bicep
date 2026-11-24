targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'learn-servicebus'
}

resource privateEndpointConnection 'Microsoft.ServiceBus/namespaces/privateEndpointConnections@2026-01-01' = {
  name: 'learn-private-endpoint'
  parent: namespace
  properties: {
    privateEndpoint: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/privateEndpoints/learn-endpoint'
    }
    privateLinkServiceConnectionState: {
      description: 'Approved for package coverage'
      status: 'Approved'
    }
    provisioningState: 'Succeeded'
  }
}

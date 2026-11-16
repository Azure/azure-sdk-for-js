targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'learnprivateendpointns'
  location: 'eastus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource privateEndpointConnection 'Microsoft.EventHub/namespaces/privateEndpointConnections@2026-01-01' = {
  name: 'learn-pec'
  parent: namespace
  properties: {
    privateEndpoint: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/privateEndpoints/learn-pe'
    }
    privateLinkServiceConnectionState: {
      description: 'Approved for package coverage'
      status: 'Approved'
    }
    provisioningState: 'Succeeded'
  }
}

targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest04'
  location: 'eastus'
  sku: {
    name: 'Premium'
  }
}

resource privateEndpointConnection 'Microsoft.ContainerRegistry/registries/privateEndpointConnections@2025-11-01' = {
  name: 'pec01'
  parent: registry
  properties: {
    privateEndpoint: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/privateEndpoints/pe01'
    }
    privateLinkServiceConnectionState: {
      actionsRequired: 'None'
      description: 'Approved for CDK package test.'
      status: 'Approved'
    }
  }
}

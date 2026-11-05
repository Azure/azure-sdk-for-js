targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' = {
  name: 'search-public-entrypoints'
  location: 'eastus'
  sku: {
    name: 'basic'
  }
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations@2025-05-01' existing = {
  name: '00000000-0000-0000-0000-000000000000.public'
  parent: searchService
}

resource privateEndpointConnection 'Microsoft.Search/searchServices/privateEndpointConnections@2025-05-01' = {
  name: 'private-endpoint'
  parent: searchService
  properties: {
    groupId: 'searchService'
    privateEndpoint: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/privateEndpoints/search-private-endpoint'
    }
    privateLinkServiceConnectionState: {
      actionsRequired: 'None'
      description: 'Approved for package coverage'
      status: 'Approved'
    }
  }
}

resource sharedPrivateLinkResource 'Microsoft.Search/searchServices/sharedPrivateLinkResources@2025-05-01' = {
  name: 'shared-private-link'
  parent: searchService
  properties: {
    groupId: 'blob'
    privateLinkResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/searchstorage'
    requestMessage: 'please approve'
  }
}

output perimeterName string = networkSecurityPerimeterConfiguration.name

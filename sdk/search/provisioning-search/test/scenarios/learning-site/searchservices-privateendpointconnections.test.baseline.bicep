targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' existing = {
  name: 'search-service'
}

resource privateEndpointConnection 'Microsoft.Search/searchServices/privateEndpointConnections@2025-05-01' = {
  name: 'private-endpoint-connection'
  parent: searchService
  properties: {
    groupId: 'string'
    privateEndpoint: {
      id: 'string'
    }
    privateLinkServiceConnectionState: {
      actionsRequired: 'string'
      description: 'string'
      status: 'Approved'
    }
    provisioningState: 'Succeeded'
  }
}

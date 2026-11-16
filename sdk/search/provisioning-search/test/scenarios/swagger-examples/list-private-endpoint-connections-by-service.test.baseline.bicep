targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' existing = {
  name: 'mysearchservice'
}

resource privateEndpointConnection 'Microsoft.Search/searchServices/privateEndpointConnections@2025-05-01' = {
  name: 'testEndpoint.50bf4fbe-d7c1-4b48-a642-4f5892642546'
  parent: searchService
}

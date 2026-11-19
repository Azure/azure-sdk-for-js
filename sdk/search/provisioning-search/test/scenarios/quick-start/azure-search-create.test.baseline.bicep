targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' = {
  name: 'search-create'
  location: 'eastus'
  properties: {
    replicaCount: 1
    partitionCount: 1
    hostingMode: 'Default'
  }
  sku: {
    name: 'standard'
  }
}

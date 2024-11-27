param baseName string = resourceGroup().name
param searchEndpointSuffix string = 'search.windows.net'

var apiVersion = '2024-06-01-preview'

resource searchService 'Microsoft.Search/searchServices@2024-06-01-preview' = {
  name: baseName
  location: resourceGroup().location
  sku: {
    name: 'basic'
  }
  properties: {
    replicaCount: 1
    partitionCount: 1
    hostingMode: 'default'
  }
}

output SEARCH_API_ADMIN_KEY string = listAdminKeys(searchService.id, apiVersion).primaryKey
output SEARCH_API_ADMIN_KEY_ALT string = listAdminKeys(searchService.id, apiVersion).secondaryKey
output ENDPOINT string = 'https://${baseName}.${searchEndpointSuffix}'

@description('The base resource name.')
param baseName string = resourceGroup().name

@description(
  'The location of the resource. By default, this is the same as the resource group.'
)
param location string = resourceGroup().location

@description('The url suffix to use when accessing the search data plane.')
param searchEndpointSuffix string = 'search.windows.net'

@description('The Search service SKU to create.')
@allowed(['free', 'basic', 'standard'])
param searchSku string = 'basic'

var searchServiceName = 'azsdk-js-${baseName}'

resource searchService 'Microsoft.Search/searchServices@2022-09-01' = {
  name: searchServiceName
  location: location
  sku: {
    name: searchSku
  }
  properties: {
    replicaCount: 1
    partitionCount: 1
    hostingMode: 'Default'
    publicNetworkAccess: 'Enabled'
  }
}

output ENDPOINT string = 'https://${baseName}.${searchEndpointSuffix}'
output SEARCH_API_ADMIN_KEY string = listAdminKeys(
  searchServiceName,
  '2022-09-01'
).primaryKey
output SEARCH_API_ADMIN_KEY_ALT string = listAdminKeys(
  searchServiceName,
  '2022-09-01'
).secondaryKey

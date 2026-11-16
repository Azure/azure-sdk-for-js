targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' existing = {
  name: 'search-service'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations@2025-05-01' existing = {
  name: '00000000-0000-0000-0000-000000000000.assoc'
  parent: searchService
}

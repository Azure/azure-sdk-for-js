targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' existing = {
  name: 'mysearchservice'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations@2025-05-01' existing = {
  name: '00000001-2222-3333-4444-111144444444.assoc1'
  parent: searchService
}

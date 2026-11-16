targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' existing = {
  name: 'mysearchservice'
}

resource sharedPrivateLinkResource 'Microsoft.Search/searchServices/sharedPrivateLinkResources@2025-05-01' = {
  name: 'testResource'
  parent: searchService
}

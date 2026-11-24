targetScope = 'resourceGroup'

resource searchService 'Microsoft.Search/searchServices@2025-05-01' = {
  name: 'acctest0001'
  location: 'westeurope'
  properties: {
    authOptions: {
      apiKeyOnly: {}
    }
    disableLocalAuth: false
    encryptionWithCmk: {
      enforcement: 'Disabled'
    }
    hostingMode: 'Default'
    networkRuleSet: {
      ipRules: []
    }
    partitionCount: 1
    publicNetworkAccess: 'Enabled'
    replicaCount: 1
  }
  sku: {
    name: 'standard'
  }
  tags: {
    environment: 'staging'
  }
}

resource sharedPrivateLinkResource 'Microsoft.Search/searchServices/sharedPrivateLinkResources@2025-05-01' = {
  name: 'acctest0001'
  parent: searchService
  properties: {
    groupId: 'blob'
    privateLinkResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/acctest0001'
    requestMessage: 'please approve'
  }
}

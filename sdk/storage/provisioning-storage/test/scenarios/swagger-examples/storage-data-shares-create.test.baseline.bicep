targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource dataShare 'Microsoft.Storage/storageAccounts/dataShares@2026-04-01' = {
  name: 'datashare1'
  parent: storageAccount
  location: 'eastus'
  properties: {
    description: 'Dummy data share'
    accessPolicies: [
      {
        principalId: '00000000-0000-0000-0000-000000000000'
        tenantId: '00000000-0000-0000-0000-000000000000'
        permission: 'Read'
      }
    ]
    assets: [
      {
        assetPath: '/container/folder/foo'
        displayName: 'virtualFoo'
      }
    ]
  }
}

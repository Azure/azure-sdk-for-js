targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
}

resource localUser 'Microsoft.Storage/storageAccounts/localUsers@2026-04-01' = {
  name: 'localuser1'
  parent: storageAccount
}

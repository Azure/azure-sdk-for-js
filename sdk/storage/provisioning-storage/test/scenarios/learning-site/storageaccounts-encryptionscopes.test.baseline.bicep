targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
}

resource encryptionScope 'Microsoft.Storage/storageAccounts/encryptionScopes@2026-04-01' = {
  name: 'encryptionscope1'
  parent: storageAccount
}

targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
}

resource fileService 'Microsoft.Storage/storageAccounts/fileServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource share 'Microsoft.Storage/storageAccounts/fileServices/shares@2026-04-01' = {
  name: 'share1'
  parent: fileService
}

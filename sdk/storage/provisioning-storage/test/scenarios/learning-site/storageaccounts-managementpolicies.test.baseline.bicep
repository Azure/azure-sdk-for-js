targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
}

resource managementPolicy 'Microsoft.Storage/storageAccounts/managementPolicies@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

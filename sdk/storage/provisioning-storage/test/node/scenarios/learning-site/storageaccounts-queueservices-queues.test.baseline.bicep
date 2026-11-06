targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
}

resource queueService 'Microsoft.Storage/storageAccounts/queueServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource queue 'Microsoft.Storage/storageAccounts/queueServices/queues@2026-04-01' = {
  name: 'queue1'
  parent: queueService
}

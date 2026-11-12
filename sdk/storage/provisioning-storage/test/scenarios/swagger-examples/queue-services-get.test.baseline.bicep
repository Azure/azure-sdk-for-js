targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource queueService 'Microsoft.Storage/storageAccounts/queueServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

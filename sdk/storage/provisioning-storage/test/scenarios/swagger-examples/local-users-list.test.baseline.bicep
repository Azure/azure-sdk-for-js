targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource localUser 'Microsoft.Storage/storageAccounts/localUsers@2026-04-01' = {
  name: 'localuser1'
  parent: storageAccount
}

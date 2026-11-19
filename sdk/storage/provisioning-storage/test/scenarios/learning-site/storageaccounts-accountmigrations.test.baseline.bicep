targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource accountMigration 'Microsoft.Storage/storageAccounts/accountMigrations@2026-04-01' existing = {
  name: 'default'
  parent: storageAccount
}

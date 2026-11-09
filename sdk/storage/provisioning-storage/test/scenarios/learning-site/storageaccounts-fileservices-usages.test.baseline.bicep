targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource fileService 'Microsoft.Storage/storageAccounts/fileServices@2026-04-01' existing = {
  name: 'default'
  parent: storageAccount
}

resource usage 'Microsoft.Storage/storageAccounts/fileServices/usages@2026-04-01' existing = {
  name: 'default'
  parent: fileService
}

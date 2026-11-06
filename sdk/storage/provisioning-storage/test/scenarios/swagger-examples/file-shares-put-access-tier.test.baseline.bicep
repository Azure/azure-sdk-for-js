targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource fileService 'Microsoft.Storage/storageAccounts/fileServices@2026-04-01' existing = {
  name: 'default'
  parent: storageAccount
}

resource share 'Microsoft.Storage/storageAccounts/fileServices/shares@2026-04-01' = {
  name: 'share1'
  parent: fileService
  properties: {
    accessTier: 'Hot'
  }
}

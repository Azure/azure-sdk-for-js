targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2026-04-01' existing = {
  name: 'default'
  parent: storageAccount
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2026-04-01' = {
  name: 'container1'
  parent: blobService
}

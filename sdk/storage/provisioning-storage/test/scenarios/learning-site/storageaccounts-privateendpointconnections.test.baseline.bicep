targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource privateEndpointConnection 'Microsoft.Storage/storageAccounts/privateEndpointConnections@2026-04-01' = {
  name: 'privateendpointconnection1'
  parent: storageAccount
}

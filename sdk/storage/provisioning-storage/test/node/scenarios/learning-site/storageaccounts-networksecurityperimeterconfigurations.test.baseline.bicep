targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Storage/storageAccounts/networkSecurityPerimeterConfigurations@2026-04-01' existing = {
  name: 'nspconfig1'
  parent: storageAccount
}

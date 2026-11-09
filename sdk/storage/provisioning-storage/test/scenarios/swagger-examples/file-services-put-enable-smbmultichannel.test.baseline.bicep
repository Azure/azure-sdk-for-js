targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource fileService 'Microsoft.Storage/storageAccounts/fileServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
  properties: {
    protocolSettings: {
      smb: {
        multichannel: {
          enabled: true
        }
      }
    }
  }
}

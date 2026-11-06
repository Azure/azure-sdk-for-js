targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  properties: {
    isHnsEnabled: true
    isLocalUserEnabled: true
    isSftpEnabled: true
  }
  sku: {
    name: 'Standard_LRS'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2026-04-01' existing = {
  name: 'default'
  parent: storageAccount
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2026-04-01' = {
  name: 'container1'
  parent: blobService
  properties: {
    publicAccess: 'None'
  }
}

resource localUser 'Microsoft.Storage/storageAccounts/localUsers@2026-04-01' = {
  name: 'localuser1'
  parent: storageAccount
  properties: {
    hasSharedKey: false
    homeDirectory: 'container1'
    permissionScopes: [
      {
        permissions: 'rcwdl'
        resourceName: 'container1'
        service: 'blob'
      }
    ]
  }
}

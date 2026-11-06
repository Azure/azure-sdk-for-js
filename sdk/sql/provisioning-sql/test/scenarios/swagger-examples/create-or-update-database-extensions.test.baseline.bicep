targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'srv_1ffd1cf8-9951-47fb-807d-a9c384763849'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: '878e303f-1ea0-4f17-aa3d-a22ac5e9da08'
  parent: server
  location: 'eastus'
}

resource extension 'Microsoft.Sql/servers/databases/extensions@2025-01-01' = {
  name: 'polybaseimport'
  parent: database
  properties: {
    operationMode: 'PolybaseImport'
    storageKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    storageKeyType: 'StorageAccessKey'
    storageUri: 'https://teststorage.blob.core.windows.net/testcontainer/Manifest.xml'
  }
}

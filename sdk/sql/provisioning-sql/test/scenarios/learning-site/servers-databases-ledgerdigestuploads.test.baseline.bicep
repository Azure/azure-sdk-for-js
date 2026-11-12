targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesledg'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesledg'
  parent: server
  location: 'eastus'
}

resource ledgerDigestUpload 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2025-01-01' = {
  name: 'current'
  parent: database
}

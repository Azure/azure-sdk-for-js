targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesrest'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesrest'
  parent: server
  location: 'eastus'
}

resource restorePoint 'Microsoft.Sql/servers/databases/restorePoints@2025-01-01' existing = {
  name: 'serversdatabasesrest'
  parent: database
}

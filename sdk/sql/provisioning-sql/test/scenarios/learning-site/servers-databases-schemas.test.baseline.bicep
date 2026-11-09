targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasessche'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasessche'
  parent: server
  location: 'eastus'
}

resource schema 'Microsoft.Sql/servers/databases/schemas@2025-01-01' existing = {
  name: 'serversdatabasessche'
  parent: database
}

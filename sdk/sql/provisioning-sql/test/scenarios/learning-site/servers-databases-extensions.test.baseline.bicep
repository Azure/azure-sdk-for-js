targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesexte'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesexte'
  parent: server
  location: 'eastus'
}

resource extension 'Microsoft.Sql/servers/databases/extensions@2025-01-01' = {
  name: 'serversdatabasesexte'
  parent: database
}

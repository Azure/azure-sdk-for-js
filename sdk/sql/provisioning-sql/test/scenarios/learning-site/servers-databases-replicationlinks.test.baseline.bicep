targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesrepl'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesrepl'
  parent: server
  location: 'eastus'
}

resource replicationLink 'Microsoft.Sql/servers/databases/replicationLinks@2025-01-01' = {
  name: 'serversdatabasesrepl'
  parent: database
}

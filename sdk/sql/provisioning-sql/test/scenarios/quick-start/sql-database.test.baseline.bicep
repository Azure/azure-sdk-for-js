targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqldatabaseserver1'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'sqldatabaseserverdat'
  parent: server
  location: 'eastus'
}

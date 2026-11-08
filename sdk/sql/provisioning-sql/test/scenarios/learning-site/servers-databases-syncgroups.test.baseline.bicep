targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasessync'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasessync'
  parent: server
  location: 'eastus'
}

resource syncGroup 'Microsoft.Sql/servers/databases/syncGroups@2025-01-01' = {
  name: 'serversdatabasessync'
  parent: database
}

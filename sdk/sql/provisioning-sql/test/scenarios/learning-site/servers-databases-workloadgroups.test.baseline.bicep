targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabaseswork'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabaseswork'
  parent: server
  location: 'eastus'
}

resource workloadGroup 'Microsoft.Sql/servers/databases/workloadGroups@2025-01-01' = {
  name: 'serversdatabaseswork'
  parent: database
}

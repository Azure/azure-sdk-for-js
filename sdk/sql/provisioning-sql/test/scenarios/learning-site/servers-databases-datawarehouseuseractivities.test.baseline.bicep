targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesdata'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesdata'
  parent: server
  location: 'eastus'
}

resource dataWarehouseUserActivity 'Microsoft.Sql/servers/databases/dataWarehouseUserActivities@2025-01-01' existing = {
  name: 'current'
  parent: database
}

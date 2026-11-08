targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesadvi'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesadvi'
  parent: server
  location: 'eastus'
}

resource advisor 'Microsoft.Sql/servers/databases/advisors@2025-01-01' existing = {
  name: 'serversdatabasesadvi'
  parent: database
}

resource recommendedAction 'Microsoft.Sql/servers/databases/advisors/recommendedActions@2025-01-01' existing = {
  name: 'serversdatabasesadvi'
  parent: advisor
}

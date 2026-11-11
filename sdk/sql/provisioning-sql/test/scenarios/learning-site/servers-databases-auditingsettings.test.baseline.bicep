targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesaudi'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesaudi'
  parent: server
  location: 'eastus'
}

resource auditingSetting 'Microsoft.Sql/servers/databases/auditingSettings@2025-01-01' = {
  name: 'default'
  parent: database
}

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

resource extendedAuditingSetting 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2025-01-01' = {
  name: 'default'
  parent: database
}

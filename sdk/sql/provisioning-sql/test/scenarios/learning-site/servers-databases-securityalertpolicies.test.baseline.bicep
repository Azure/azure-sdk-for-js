targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasessecu'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasessecu'
  parent: server
  location: 'eastus'
}

resource securityAlertPolicy 'Microsoft.Sql/servers/databases/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

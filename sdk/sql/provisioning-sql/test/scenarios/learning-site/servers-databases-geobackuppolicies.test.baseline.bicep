targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesgeob'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesgeob'
  parent: server
  location: 'eastus'
}

resource geoBackupPolicy 'Microsoft.Sql/servers/databases/geoBackupPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

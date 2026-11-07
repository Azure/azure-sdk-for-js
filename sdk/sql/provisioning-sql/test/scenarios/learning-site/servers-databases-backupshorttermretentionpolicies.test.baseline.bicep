targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesback'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesback'
  parent: server
  location: 'eastus'
}

resource backupShortTermRetentionPolicy 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: database
}

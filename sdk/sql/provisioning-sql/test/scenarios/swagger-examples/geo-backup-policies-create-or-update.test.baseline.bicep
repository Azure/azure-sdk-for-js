targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqlcrudtest-5961'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'testdw'
  parent: server
  location: 'eastus'
}

resource geoBackupPolicy 'Microsoft.Sql/servers/databases/geoBackupPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
  properties: {
    state: 'Enabled'
  }
}

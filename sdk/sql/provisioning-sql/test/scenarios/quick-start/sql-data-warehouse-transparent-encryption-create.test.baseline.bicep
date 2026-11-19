targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqldatawarehousetran'
  location: 'eastus'
}

resource auditingSetting 'Microsoft.Sql/servers/auditingSettings@2025-01-01' = {
  name: 'default'
  parent: server
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'sqldatawarehousetran'
  parent: server
  location: 'eastus'
}

resource transparentDataEncryption 'Microsoft.Sql/servers/databases/transparentDataEncryption@2025-01-01' = {
  name: 'current'
  parent: database
}

resource securityAlertPolicy 'Microsoft.Sql/servers/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: server
}

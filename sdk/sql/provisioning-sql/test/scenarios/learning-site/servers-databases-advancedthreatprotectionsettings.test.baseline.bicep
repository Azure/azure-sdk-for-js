targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesadva'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesadva'
  parent: server
  location: 'eastus'
}

resource advancedThreatProtectionSetting 'Microsoft.Sql/servers/databases/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: database
}

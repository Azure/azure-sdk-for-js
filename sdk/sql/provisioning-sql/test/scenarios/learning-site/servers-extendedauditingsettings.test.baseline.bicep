targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversextendedaudit'
  location: 'eastus'
}

resource extendedAuditingSetting 'Microsoft.Sql/servers/extendedAuditingSettings@2025-01-01' = {
  name: 'default'
  parent: server
}

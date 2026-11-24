targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdevopsauditin'
  location: 'eastus'
}

resource devOpsAuditingSetting 'Microsoft.Sql/servers/devOpsAuditingSettings@2025-01-01' = {
  name: 'Default'
  parent: server
}

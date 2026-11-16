targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqlauditingserverpol'
  location: 'eastus'
}

resource devOpsAuditingSetting 'Microsoft.Sql/servers/devOpsAuditingSettings@2025-01-01' = {
  name: 'Default'
  parent: server
}

resource auditingSetting 'Microsoft.Sql/servers/auditingSettings@2025-01-01' = {
  name: 'default'
  parent: server
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'sqlauditingserverpol'
  parent: server
  location: 'eastus'
}

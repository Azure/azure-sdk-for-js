targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'blobauditingtest-2080'
  location: 'eastus'
}

resource auditingSetting 'Microsoft.Sql/servers/auditingSettings@2025-01-01' = {
  name: 'default'
  parent: server
}

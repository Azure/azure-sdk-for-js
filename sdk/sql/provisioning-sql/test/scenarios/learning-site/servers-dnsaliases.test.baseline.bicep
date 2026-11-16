targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdnsaliasesser'
  location: 'eastus'
}

resource dnsAlias 'Microsoft.Sql/servers/dnsAliases@2025-01-01' = {
  name: 'serversdnsaliasesser'
  parent: server
}

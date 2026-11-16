targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversvirtualnetwor'
  location: 'eastus'
}

resource virtualNetworkRule 'Microsoft.Sql/servers/virtualNetworkRules@2025-01-01' = {
  name: 'serversvirtualnetwor'
  parent: server
}

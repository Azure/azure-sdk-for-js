targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversfirewallrules'
  location: 'eastus'
}

resource firewallRule 'Microsoft.Sql/servers/firewallRules@2025-01-01' = {
  name: 'serversfirewallrules'
  parent: server
}

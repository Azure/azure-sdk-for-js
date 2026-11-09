targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversoutboundfirew'
  location: 'eastus'
}

resource outboundFirewallRule 'Microsoft.Sql/servers/outboundFirewallRules@2025-01-01' = {
  name: 'serversoutboundfirew'
  parent: server
}

targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversipv6firewallr'
  location: 'eastus'
}

resource ipv6FirewallRule 'Microsoft.Sql/servers/ipv6FirewallRules@2025-01-01' = {
  name: 'serversipv6firewallr'
  parent: server
}

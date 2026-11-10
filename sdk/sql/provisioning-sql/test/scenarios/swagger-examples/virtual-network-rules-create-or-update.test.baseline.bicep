targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'vnet-test-svr'
  location: 'eastus'
}

resource virtualNetworkRule 'Microsoft.Sql/servers/virtualNetworkRules@2025-01-01' = {
  name: 'vnet-firewall-rule'
  parent: server
  properties: {
    ignoreMissingVnetServiceEndpoint: false
    virtualNetworkSubnetId: '/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Network/virtualNetworks/testvnet/subnets/testsubnet'
  }
}

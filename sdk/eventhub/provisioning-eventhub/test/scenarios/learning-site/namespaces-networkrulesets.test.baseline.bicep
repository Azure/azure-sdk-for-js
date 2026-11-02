targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'learnnetworkns'
  location: 'eastus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource networkRuleSet 'Microsoft.EventHub/namespaces/networkRuleSets@2026-01-01' = {
  name: 'default'
  parent: namespace
  properties: {
    defaultAction: 'Deny'
    ipRules: [
      {
        action: 'Allow'
        ipMask: '10.0.0.0/24'
      }
    ]
    publicNetworkAccess: 'Enabled'
    trustedServiceAccessEnabled: true
    virtualNetworkRules: [
      {
        ignoreMissingVnetServiceEndpoint: true
        subnet: {
          id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/virtualNetworks/learn-vnet/subnets/default'
        }
      }
    ]
  }
}

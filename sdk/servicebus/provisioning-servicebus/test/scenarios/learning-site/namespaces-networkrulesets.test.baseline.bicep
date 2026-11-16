targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'learn-servicebus'
}

resource networkRuleSet 'Microsoft.ServiceBus/namespaces/networkRuleSets@2026-01-01' = {
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
        ignoreMissingVnetServiceEndpoint: false
        subnet: {
          id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/virtualNetworks/learn-vnet/subnets/default'
        }
      }
    ]
  }
}

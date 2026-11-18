targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'quickstart-premium'
  location: 'eastus'
  properties: {}
  sku: {
    name: 'Premium'
    tier: 'Premium'
    capacity: 1
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2026-01-01' = {
  name: 'custom-sas-key'
  parent: namespace
  properties: {
    rights: [
      'Send'
      'Listen'
      'Manage'
    ]
  }
}

targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'quickstart-servicebus'
  location: 'eastus'
  properties: {}
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2026-01-01' = {
  name: 'namespace-auth-rule'
  parent: namespace
  properties: {
    rights: [
      'Send'
    ]
  }
}

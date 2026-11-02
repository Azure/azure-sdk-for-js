targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickauthrulens'
  location: 'eastus'
  properties: {
    isAutoInflateEnabled: true
    maximumThroughputUnits: 7
  }
  sku: {
    name: 'Standard'
  }
}

resource authorizationRule 'Microsoft.EventHub/namespaces/authorizationRules@2026-01-01' = {
  name: 'quick-namespace-rule'
  parent: namespace
  properties: {
    rights: [
      'Send'
      'Listen'
      'Manage'
    ]
  }
}

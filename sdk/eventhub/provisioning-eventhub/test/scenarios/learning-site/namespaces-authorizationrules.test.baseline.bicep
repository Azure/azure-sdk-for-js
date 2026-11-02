targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'acctest0001'
  location: 'westeurope'
  properties: {
    disableLocalAuth: false
    isAutoInflateEnabled: false
    publicNetworkAccess: 'Enabled'
    zoneRedundant: false
  }
  sku: {
    capacity: 1
    name: 'Basic'
    tier: 'Basic'
  }
}

resource authorizationRule 'Microsoft.EventHub/namespaces/authorizationRules@2026-01-01' = {
  name: 'acctest0001'
  parent: namespace
  properties: {
    rights: [
      'Listen'
      'Send'
      'Manage'
    ]
  }
}

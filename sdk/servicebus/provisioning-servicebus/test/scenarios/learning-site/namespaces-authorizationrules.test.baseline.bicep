targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'acctest0001'
  location: 'westeurope'
  properties: {
    disableLocalAuth: false
    publicNetworkAccess: 'Enabled'
    zoneRedundant: false
  }
  sku: {
    capacity: 0
    name: 'Standard'
    tier: 'Standard'
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2026-01-01' = {
  name: 'acctest0001'
  parent: namespace
  properties: {
    rights: [
      'Listen'
    ]
  }
}

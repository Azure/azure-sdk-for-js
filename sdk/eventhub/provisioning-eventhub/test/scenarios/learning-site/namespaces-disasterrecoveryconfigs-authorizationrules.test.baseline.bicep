targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'learndrns'
  location: 'eastus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
}

resource disasterRecoveryConfig 'Microsoft.EventHub/namespaces/disasterRecoveryConfigs@2026-01-01' = {
  name: 'learn-dr'
  parent: namespace
  properties: {}
}

resource authorizationRule 'Microsoft.EventHub/namespaces/disasterRecoveryConfigs/authorizationRules@2026-01-01' existing = {
  name: 'learn-rule'
  parent: disasterRecoveryConfig
}

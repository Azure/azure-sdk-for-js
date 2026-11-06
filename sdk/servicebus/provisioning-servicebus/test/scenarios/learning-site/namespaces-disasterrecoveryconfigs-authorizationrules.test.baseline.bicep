targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'learn-servicebus'
}

resource disasterRecoveryConfig 'Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs@2026-01-01' existing = {
  name: 'learn-alias'
  parent: namespace
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs/authorizationRules@2026-01-01' existing = {
  name: 'learn-rule'
  parent: disasterRecoveryConfig
}

targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'sdk-Namespace-9080'
}

resource disasterRecoveryConfig 'Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs@2026-01-01' existing = {
  name: 'sdk-DisasterRecovery-4879'
  parent: namespace
}

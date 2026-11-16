targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'sdk-Namespace-41'
}

resource migrationConfiguration 'Microsoft.ServiceBus/namespaces/migrationConfigurations@2026-01-01' existing = {
  name: '$default'
  parent: namespace
}

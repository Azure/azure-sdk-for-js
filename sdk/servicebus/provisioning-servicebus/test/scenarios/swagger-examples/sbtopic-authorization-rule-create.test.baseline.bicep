targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'sdk-Namespace-6261'
}

resource topic 'Microsoft.ServiceBus/namespaces/topics@2026-01-01' = {
  name: 'sdk-Topics-1984'
  parent: namespace
  properties: {}
}

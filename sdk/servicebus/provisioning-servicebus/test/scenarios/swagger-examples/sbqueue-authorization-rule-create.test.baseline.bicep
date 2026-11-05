targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'sdk-Namespace-7982'
}

resource queue 'Microsoft.ServiceBus/namespaces/queues@2026-01-01' = {
  name: 'sdk-Queues-2317'
  parent: namespace
  properties: {}
}

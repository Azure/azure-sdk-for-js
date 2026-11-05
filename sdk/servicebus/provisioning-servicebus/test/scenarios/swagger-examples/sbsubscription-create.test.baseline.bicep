targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'sdk-Namespace-1349'
}

resource topic 'Microsoft.ServiceBus/namespaces/topics@2026-01-01' existing = {
  name: 'sdk-Topics-8740'
  parent: namespace
}

resource subscriptionResource 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2026-01-01' = {
  name: 'sdk-Subscriptions-2178'
  parent: topic
  properties: {
    enableBatchedOperations: true
  }
}

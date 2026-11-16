targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'sdk-Namespace-1319'
}

resource topic 'Microsoft.ServiceBus/namespaces/topics@2026-01-01' existing = {
  name: 'sdk-Topics-2081'
  parent: namespace
}

resource subscriptionResource 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2026-01-01' existing = {
  name: 'sdk-Subscriptions-8691'
  parent: topic
}

resource rule 'Microsoft.ServiceBus/namespaces/topics/subscriptions/rules@2026-01-01' = {
  name: 'sdk-Rules-6571'
  parent: subscriptionResource
  properties: {
    correlationFilter: {
      properties: {
        topicHint: 'Crop'
      }
    }
    filterType: 'CorrelationFilter'
  }
}

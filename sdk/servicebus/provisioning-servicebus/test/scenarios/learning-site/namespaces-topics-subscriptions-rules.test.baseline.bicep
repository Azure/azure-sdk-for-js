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

resource topic 'Microsoft.ServiceBus/namespaces/topics@2026-01-01' = {
  name: 'acctest0001'
  parent: namespace
  properties: {
    enableBatchedOperations: false
    enableExpress: false
    enablePartitioning: false
    maxSizeInMegabytes: 5120
    requiresDuplicateDetection: false
    status: 'Active'
    supportOrdering: false
  }
}

resource subscriptionResource 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2026-01-01' = {
  name: 'acctest0001'
  parent: topic
  properties: {
    deadLetteringOnFilterEvaluationExceptions: true
    deadLetteringOnMessageExpiration: false
    enableBatchedOperations: false
    isClientAffine: false
    maxDeliveryCount: 10
    requiresSession: false
    status: 'Active'
  }
}

resource rule 'Microsoft.ServiceBus/namespaces/topics/subscriptions/rules@2026-01-01' = {
  name: 'acctest0001'
  parent: subscriptionResource
  properties: {
    correlationFilter: {
      contentType: 'test_content_type'
      correlationId: 'test_correlation_id'
      label: 'test_label'
      messageId: 'test_message_id'
      replyTo: 'test_reply_to'
      replyToSessionId: 'test_reply_to_session_id'
      sessionId: 'test_session_id'
      to: 'test_to'
    }
    filterType: 'CorrelationFilter'
  }
}

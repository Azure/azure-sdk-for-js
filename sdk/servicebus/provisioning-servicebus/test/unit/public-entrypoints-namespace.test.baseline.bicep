targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' = {
  name: 'public-servicebus'
  location: 'eastus'
  properties: {
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    name: 'Premium'
    tier: 'Premium'
    capacity: 1
  }
}

resource authorizationRule 'Microsoft.ServiceBus/namespaces/AuthorizationRules@2026-01-01' = {
  name: 'namespace-rule'
  parent: namespace
  properties: {
    rights: [
      'Listen'
    ]
  }
}

resource disasterRecoveryConfig 'Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs@2026-01-01' = {
  name: 'public-alias'
  parent: namespace
  properties: {
    alternateName: 'public-secondary'
  }
}

resource authorizationRule2 'Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs/authorizationRules@2026-01-01' existing = {
  name: 'alias-rule'
  parent: disasterRecoveryConfig
}

resource migrationConfiguration 'Microsoft.ServiceBus/namespaces/migrationConfigurations@2026-01-01' = {
  name: '$default'
  parent: namespace
  properties: {
    postMigrationName: 'public-standard'
    targetNamespace: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.ServiceBus/namespaces/public-premium'
  }
}

resource networkRuleSet 'Microsoft.ServiceBus/namespaces/networkRuleSets@2026-01-01' = {
  name: 'default'
  parent: namespace
  properties: {
    defaultAction: 'Allow'
    publicNetworkAccess: 'Enabled'
  }
}

resource networkSecurityPerimeterConfiguration 'Microsoft.ServiceBus/namespaces/networkSecurityPerimeterConfigurations@2026-01-01' existing = {
  name: 'public-association'
  parent: namespace
}

resource privateEndpointConnection 'Microsoft.ServiceBus/namespaces/privateEndpointConnections@2026-01-01' = {
  name: 'public-endpoint'
  parent: namespace
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
    }
  }
}

resource queue 'Microsoft.ServiceBus/namespaces/queues@2026-01-01' = {
  name: 'public-queue'
  parent: namespace
  properties: {
    maxDeliveryCount: 10
  }
}

resource authorizationRule3 'Microsoft.ServiceBus/namespaces/queues/authorizationRules@2026-01-01' = {
  name: 'queue-rule'
  parent: queue
  properties: {
    rights: [
      'Send'
    ]
  }
}

resource topic 'Microsoft.ServiceBus/namespaces/topics@2026-01-01' = {
  name: 'public-topic'
  parent: namespace
  properties: {
    supportOrdering: true
  }
}

resource authorizationRule4 'Microsoft.ServiceBus/namespaces/topics/authorizationRules@2026-01-01' = {
  name: 'topic-rule'
  parent: topic
  properties: {
    rights: [
      'Manage'
    ]
  }
}

resource subscriptionResource 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2026-01-01' = {
  name: 'public-subscription'
  parent: topic
  properties: {
    maxDeliveryCount: 10
  }
}

resource rule 'Microsoft.ServiceBus/namespaces/topics/subscriptions/rules@2026-01-01' = {
  name: 'public-rule'
  parent: subscriptionResource
  properties: {
    filterType: 'SqlFilter'
    sqlFilter: {
      sqlExpression: 'priority = \'high\''
    }
  }
}

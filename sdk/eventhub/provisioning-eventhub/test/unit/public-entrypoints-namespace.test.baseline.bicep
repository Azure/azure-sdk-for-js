targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'publicnamespace'
  location: 'eastus'
  properties: {
    disableLocalAuth: false
    isAutoInflateEnabled: true
    maximumThroughputUnits: 4
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
  tags: {
    coverage: 'public-entrypoints'
  }
}

resource applicationGroup 'Microsoft.EventHub/namespaces/applicationGroups@2026-01-01' = {
  name: 'public-app-group'
  parent: namespace
  properties: {
    clientAppGroupIdentifier: 'AADAppID=44444444-4444-4444-4444-444444444444'
    isEnabled: true
  }
}

resource authorizationRule 'Microsoft.EventHub/namespaces/authorizationRules@2026-01-01' = {
  name: 'public-ns-rule'
  parent: namespace
  properties: {
    rights: [
      'Listen'
      'Send'
      'Manage'
    ]
  }
}

resource disasterRecoveryConfig 'Microsoft.EventHub/namespaces/disasterRecoveryConfigs@2026-01-01' = {
  name: 'public-dr'
  parent: namespace
  properties: {
    alternateName: 'public-dr-alternate'
  }
}

resource authorizationRule2 'Microsoft.EventHub/namespaces/disasterRecoveryConfigs/authorizationRules@2026-01-01' existing = {
  name: 'public-dr-rule'
  parent: disasterRecoveryConfig
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'public-eventhub'
  parent: namespace
  properties: {
    messageRetentionInDays: 7
    partitionCount: 2
    status: 'Active'
  }
}

resource authorizationRule3 'Microsoft.EventHub/namespaces/eventhubs/authorizationRules@2026-01-01' = {
  name: 'public-eventhub-rule'
  parent: eventhub
  properties: {
    rights: [
      'Send'
    ]
  }
}

resource consumergroup 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2026-01-01' = {
  name: 'public-consumer'
  parent: eventhub
  properties: {
    userMetadata: 'public entrypoint coverage'
  }
}

resource networkRuleSet 'Microsoft.EventHub/namespaces/networkRuleSets@2026-01-01' = {
  name: 'default'
  parent: namespace
  properties: {
    defaultAction: 'Allow'
    publicNetworkAccess: 'Enabled'
    trustedServiceAccessEnabled: true
  }
}

resource networkSecurityPerimeterConfiguration 'Microsoft.EventHub/namespaces/networkSecurityPerimeterConfigurations@2026-01-01' existing = {
  name: 'public-perimeter'
  parent: namespace
}

resource privateEndpointConnection 'Microsoft.EventHub/namespaces/privateEndpointConnections@2026-01-01' = {
  name: 'public-pec'
  parent: namespace
  properties: {
    privateLinkServiceConnectionState: {
      description: 'Approved for public entrypoint coverage'
      status: 'Approved'
    }
  }
}

resource schemagroup 'Microsoft.EventHub/namespaces/schemagroups@2026-01-01' = {
  name: 'public-schema-group'
  parent: namespace
  properties: {
    schemaCompatibility: 'Forward'
    schemaType: 'Avro'
  }
}

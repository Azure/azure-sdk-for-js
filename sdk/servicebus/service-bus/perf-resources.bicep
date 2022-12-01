param baseName string = resourceGroup().name
param location string = resourceGroup().location

resource serviceBusNamespace 'Microsoft.ServiceBus/namespaces@2022-01-01-preview' = {
  name: 'sb-${baseName}'
  location: location
  sku: {
    capacity: 40
    name: 'Standard'
    tier: 'Standard'
  }
}

resource testQueue 'Microsoft.ServiceBus/namespaces/queues@2022-01-01-preview' = {
  parent: serviceBusNamespace
  name: 'sb-${baseName}-queue'
  properties: {
    lockDuration: 'PT5M'
    maxSizeInMegabytes: 1024
    requiresDuplicateDetection: false
    requiresSession: false
    defaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S'
    deadLetteringOnMessageExpiration: false
    duplicateDetectionHistoryTimeWindow: 'PT10M'
    maxDeliveryCount: 10
    autoDeleteOnIdle: 'P10675199DT2H48M5.4775807S'
    enablePartitioning: true
    enableExpress: false
  }
}

var serviceBusAuthRuleResourceId = resourceId('Microsoft.ServiceBus/namespaces/authorizationRules', serviceBusNamespace.name, 'RootManageSharedAccessKey')

output SERVICEBUS_CONNECTION_STRING string = listkeys(serviceBusAuthRuleResourceId, '2022-01-01-preview').primaryConnectionString

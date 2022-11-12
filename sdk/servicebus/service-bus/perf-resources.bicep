param baseName string = resourceGroup().name
param location string = resourceGroup().location

resource serviceBusNamespace 'Microsoft.ServiceBus/namespaces/queues@2021-11-01' = {
  name: 'sb-${baseName}'
  location: location
  sku: {
    capacity: 40
    name: 'Standard'
    tier: 'Standard'
  }

  resource serviceBus 'servicebus' = {
    name: 'sb-${baseName}'
    properties: {
      enablePartitioning: true
    }
  }
}

var serviceBusAuthRuleResourceId = resourceId('Microsoft.ServiceBus/namespaces/queues/authorizationRules', serviceBusNamespace.name, 'RootManageSharedAccessKey')

output SERVICEBUS_CONNECTION_STRING string = listkeys(serviceBusAuthRuleResourceId, '2021-11-01').primaryConnectionString

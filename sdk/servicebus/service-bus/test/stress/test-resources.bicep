targetScope = 'subscription'

@description('The base resource name.')
param baseName string

param location string
param now string = utcNow('u')

@description('The client OID to grant access to test resources.')
param testApplicationOid string

var apiVersion = '2017-04-01'

resource group 'Microsoft.Resources/resourceGroups@2020-10-01' = {
    name: 'rg-${baseName}-${uniqueString(now)}'
    location: location
    tags: {
        DeleteAfter: dateTimeAdd(now, 'PT8H')
    }
}

module servicebus 'sb.bicep' = {
    name: 'service-bus'
    scope: group
    params: {
        baseName: baseName
        testApplicationOid: testApplicationOid
    }
}


output SERVICEBUS_CONNECTION_STRING string = listKeys(resourceId('Microsoft.ServiceBus/namespaces/authorizationRules', baseName, 'RootManageSharedAccessKey'), apiVersion).primaryConnectionString
output SERVICEBUS_ENDPOINT string = replace(servicebus.outputs.endpoint, ':443/', '')
output QUEUE_NAME string = 'testQueue'
output QUEUE_NAME_WITH_SESSIONS string = 'testQueueWithSessions'
output RESOURCE_GROUP string = group.name

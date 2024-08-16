param baseName string = resourceGroup().name
param storageEndpointSuffix string = environment().suffixes.storage
param testApplicationOid string

var apiVersion = '2024-01-01'
var storageApiVersion = '2023-05-01'
var iotApiVersion = '2023-06-30'
var namespaceName = baseName
var storageAccountName = 'storage${baseName}'
var containerName = 'container'
var iotName = 'iot${baseName}'
var authorizationName = '${baseName}/RootManageSharedAccessKey'
var eventHubName = 'eventhub'
var eventHubNameFull = '${baseName}/eventhub'
var eventHubConsumerGroupName = '$Default'
var retentionTimeInDays = 1
var partitionCount = 4
var location = resourceGroup().location
var eventHubsDataOwnerRoleId = 'f526a384-b230-433a-b45c-95f59c4a2dec'
var blobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var tablesDataContributorRoleId = '0a9a7e1f-b9d0-4cc4-a60d-0319b160aaa3'
var iotHubDataContributorRoleId = '4fc6c259-987e-4a07-842e-c321cc9d413f'

resource eventHubNamespace 'Microsoft.EventHub/namespaces@2024-01-01' = {
  name: namespaceName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 5
  }
  properties: {
    zoneRedundant: false
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
  }
}

resource eventHubAuthorizationRule 'Microsoft.EventHub/namespaces/AuthorizationRules@2024-01-01' = {
  name: authorizationName
  dependsOn: [
    eventHubNamespace
  ]
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
}

resource eventHub 'Microsoft.EventHub/namespaces/eventhubs@2024-01-01' = {
  name: eventHubNameFull
  dependsOn: [
    eventHubNamespace
  ]
  properties: {
    messageRetentionInDays: retentionTimeInDays
    partitionCount: partitionCount
  }
}

resource eventHubConsumerGroup 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2024-01-01' = {
  name: eventHubConsumerGroupName
  dependsOn: [
    eventHubNamespace
  ]
  properties: {}
  parent: eventHub
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          enabled: true
        }
        blob: {
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  name: '${storageAccountName}/default/${containerName}'
  dependsOn: [
    storageAccount
  ]
}

resource iotHub 'Microsoft.Devices/IotHubs@2023-06-30' = {
  name: iotName
  location: location
  sku: {
    name: 'S1'
    capacity: 1
  }
  properties: {
    ipFilterRules: []
    eventHubEndpoints: {
      events: {
        retentionTimeInDays: retentionTimeInDays
        partitionCount: partitionCount
      }
    }
    routing: {
      endpoints: {
        serviceBusQueues: []
        serviceBusTopics: []
        eventHubs: []
        storageContainers: []
      }
      routes: []
      fallbackRoute: {
        name: '$fallback'
        source: 'DeviceMessages'
        condition: 'true'
        endpointNames: [
          'events'
        ]
        isEnabled: true
      }
    }
    storageEndpoints: {
      '$default': {
        sasTtlAsIso8601: 'PT1H'
        connectionString: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};AccountKey=${listKeys(storageAccount.id, storageApiVersion).keys[0].value};EndpointSuffix=${storageEndpointSuffix}'
        containerName: containerName
      }
    }
    messagingEndpoints: {
      fileNotifications: {
        lockDurationAsIso8601: 'PT1M'
        ttlAsIso8601: 'PT1H'
        maxDeliveryCount: 10
      }
    }
    enableFileUploadNotifications: false
    cloudToDevice: {
      maxDeliveryCount: 10
      defaultTtlAsIso8601: 'PT1H'
      feedback: {
        lockDurationAsIso8601: 'PT1M'
        ttlAsIso8601: 'PT1H'
        maxDeliveryCount: 10
      }
    }
    features: 'None'
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: '${baseName}-kv'
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: testApplicationOid
        permissions: {
          secrets: [
            'get'
            'list'
            'set'
          ]
        }
      }
    ]
  }
  dependsOn: [
    eventHubAuthorizationRule
    storageAccount
    iotHub
  ]
}

resource eventHubConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'eventhub-connection-string'
  properties: {
    value: listKeys(eventHubAuthorizationRule.id, apiVersion).primaryConnectionString
  }
  parent: keyVault
}

resource iotHubConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'iothub-connection-string'
  properties: {
    value: 'HostName=${iotHub.properties.hostName};SharedAccessKeyName=iothubowner;SharedAccessKey=${listKeys(iotHub.id, iotApiVersion).value[0].primaryKey}'
  }
  parent: keyVault
}

resource eventHubsDataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('dataOwnerRoleId', baseName)
  dependsOn: [
    eventHubNamespace
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', eventHubsDataOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource blobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataContributorRoleId', storageAccountName)
  dependsOn: [
    storageAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource tablesDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('tablesDataContributorRoleId', storageAccountName)
  dependsOn: [
    storageAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', tablesDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource iotHubDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('iotHubDataContributorRoleId', iotName)
  dependsOn: [
    iotHub
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', iotHubDataContributorRoleId)
    principalId: testApplicationOid
  }
}

output EVENTHUB_FQDN string = replace(replace(eventHubNamespace.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output EVENTHUB_NAME string = eventHubName
output EVENTHUB_CONSUMER_GROUP_NAME string = eventHubConsumerGroupName
output IOTHUB_EVENTHUB_FQDN string = iotHub.properties.eventHubEndpoints.events.endpoint
output IOTHUB_EVENTHUB_NAME string = iotHub.properties.eventHubEndpoints.events.path
output STORAGE_ACCOUNT_NAME string = storageAccountName
output STORAGE_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob
output STORAGE_CONTAINER_NAME string = containerName
output STORAGE_CONTAINER_URL string = '${storageAccount.properties.primaryEndpoints.blob}${containerName}'
output KEYVAULT_URI string = keyVault.properties.vaultUri
output EVENTHUB_CONNECTION_STRING_NAME string = eventHubConnectionStringSecret.name
output IOTHUB_CONNECTION_STRING_NAME string = iotHubConnectionStringSecret.name

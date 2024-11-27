param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string

var eventHubApiVersion = '2024-01-01'
var storageApiVersion = '2023-05-01'
var iotHubApiVersion = '2023-06-30'
var storageAccountName = 'storage${baseName}'
var containerName = 'container'
var iotHubName = 'iot${baseName}'
var eventHubName = 'eventhub'
var eventHubConsumerGroupName = '$Default'
var eventHubConnectionStringSecretName = 'eventhub-connection-string'
var iotHubConnectionStringSecretName = 'iothub-connection-string'
var kvName = 'kv-${baseName}'
var retentionTimeInDays = 1
var partitionCount = 4
var eventHubsDataOwnerRoleId = 'f526a384-b230-433a-b45c-95f59c4a2dec'
var blobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var tablesDataContributorRoleId = '0a9a7e1f-b9d0-4cc4-a60d-0319b160aaa3'
var iotHubDataContributorRoleId = '4fc6c259-987e-4a07-842e-c321cc9d413f'

resource eventHubNamespace 'Microsoft.EventHub/namespaces@2024-01-01' = {
  name: baseName
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

resource eventHubAuthorizationRule 'Microsoft.EventHub/namespaces/authorizationRules@2024-01-01' = {
  name: 'RootManageSharedAccessKey'
  parent: eventHubNamespace
  properties: {
    rights: [
      'Listen'
      'Manage'
      'Send'
    ]
  }
}

resource eventHub 'Microsoft.EventHub/namespaces/eventhubs@2024-01-01' = {
  name: eventHubName
  parent: eventHubNamespace
  properties: {
    messageRetentionInDays: retentionTimeInDays
    partitionCount: partitionCount
  }
}

resource eventHubConsumerGroup 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2024-01-01' = {
  name: eventHubConsumerGroupName
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
  name: iotHubName
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
        connectionString: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};AccountKey=${listKeys(storageAccount.id, storageApiVersion).keys[0].value};EndpointSuffix=${environment().suffixes.storage}'
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

module keyVault 'kv.bicep' = {
  name: 'deployKeyVault'
  params: {
    location: location
    kvName: kvName
    objectId: testApplicationOid
    tenantId: subscription().tenantId
  }
  dependsOn: [
    eventHubAuthorizationRule
    iotHub
  ]
}

resource eventHubConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2024-04-01-preview' = {
  name: '${kvName}/${eventHubConnectionStringSecretName}'
  properties: {
    value: listKeys(eventHubAuthorizationRule.id, eventHubApiVersion).primaryConnectionString
  }
  dependsOn: [
    keyVault
  ]
}

resource iotHubConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2024-04-01-preview' = {
  name: '${kvName}/${iotHubConnectionStringSecretName}'
  properties: {
    value: 'HostName=${iotHub.properties.hostName};SharedAccessKeyName=iothubowner;SharedAccessKey=${listKeys(iotHub.id, iotHubApiVersion).value[0].primaryKey}'
  }
  dependsOn: [
    keyVault
  ]
}

resource eventHubsDataOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('dataOwnerRoleId', eventHubNamespace.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', eventHubsDataOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource blobDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('blobDataContributorRoleId', storageAccount.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource tablesDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('tablesDataContributorRoleId', storageAccount.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', tablesDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource iotHubDataContributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('iotHubDataContributorRoleId', iotHub.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', iotHubDataContributorRoleId)
    principalId: testApplicationOid
  }
}

output EVENTHUB_FQDN string = replace(replace(eventHubNamespace.properties.serviceBusEndpoint, ':443/', ''), 'https://', '')
output EVENTHUB_NAME string = eventHub.name
output EVENTHUB_CONSUMER_GROUP_NAME string = eventHubConsumerGroup.name
output IOTHUB_EVENTHUB_FQDN string = iotHub.properties.eventHubEndpoints.events.endpoint
output IOTHUB_EVENTHUB_NAME string = iotHub.properties.eventHubEndpoints.events.path
output STORAGE_ACCOUNT_NAME string = storageAccount.name
output STORAGE_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob
output STORAGE_CONTAINER_NAME string = containerName
output STORAGE_CONTAINER_URL string = '${storageAccount.properties.primaryEndpoints.blob}${containerName}'
output KEYVAULT_URI string = keyVault.outputs.keyVaultUri
output EVENTHUB_CONNECTION_STRING_SECRET_NAME string = eventHubConnectionStringSecretName
output IOTHUB_CONNECTION_STRING_SECRET_NAME string = iotHubConnectionStringSecretName

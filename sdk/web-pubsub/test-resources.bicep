param baseName string = resourceGroup().name
param testApplicationOid string
param location string = resourceGroup().location
param supportsSafeSecretStandard bool = false

var webpubsubName = 'e2e-${baseName}'
var socketioName = 'e2e-socketio-${baseName}'
var apiVersion = '2024-04-01-preview'
var operatorRoleId = 'c7393b34-138c-406f-901b-d8cf2b17e6ae'
var ownerRoleId = '12cf5a90-567b-43ae-8102-96cf46c7d9b4'

resource webPubSubSocketIO 'Microsoft.SignalRService/webPubSub@2024-10-01-preview' = {
  name: socketioName
  location: location
  kind: 'SocketIO'
  sku: {
    name: 'Standard_S1'
    tier: 'Standard'
    capacity: 1
  }
  properties: {
    tls: {
      clientCertEnabled: false
    }
    disableLocalAuth: supportsSafeSecretStandard
  }
}

resource webPubSub 'Microsoft.SignalRService/webPubSub@2024-10-01-preview' = {
  name: webpubsubName
  location: location
  kind: 'WebPubSub'
  sku: {
    name: 'Standard_S1'
    tier: 'Standard'
    capacity: 1
  }
  properties: {
    tls: {
      clientCertEnabled: false
    }
    networkACLs: {
      defaultAction: 'Deny'
      publicNetwork: {
        allow: ['ServerConnection', 'ClientConnection', 'RESTAPI', 'Trace']
      }
      privateEndpoints: []
    }
    disableLocalAuth: supportsSafeSecretStandard
  }
}

resource ownerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('ownerRoleId', webPubSub.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', ownerRoleId)
    principalId: testApplicationOid
  }
}

resource operatorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('operatorRoleId', webPubSub.id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', operatorRoleId)
    principalId: testApplicationOid
  }
}

output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output WPS_NAME string = webPubSub.name
output WPS_ENDPOINT string = 'https://${webPubSub.properties.hostName}'
output WPS_REVERSE_PROXY_ENDPOINT string = split(split(listKeys(webPubSub.id, apiVersion).primaryConnectionString, ';')[0], '=')[1]
output WPS_SOCKETIO_ENDPOINT string = 'https://${webPubSubSocketIO.properties.hostName}'

param baseName string = resourceGroup().name
param testApplicationOid string
param location string = resourceGroup().location

var webpubsubName = 'e2e-${baseName}'
var apiVersion = '2024-04-01-preview'
var operatorRoleId = 'c7393b34-138c-406f-901b-d8cf2b17e6ae'
var ownerRoleId = '12cf5a90-567b-43ae-8102-96cf46c7d9b4'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2024-04-01-preview' = {
  name: webpubsubName
  location: location
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
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: false
    disableAadAuth: false
  }
}

resource ownerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('ownerRoleId', webpubsubName)
  dependsOn: [
    webPubSub
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', ownerRoleId)
    principalId: testApplicationOid
  }
}

resource operatorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('operatorRoleId', webpubsubName)
  dependsOn: [
    webPubSub
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', operatorRoleId)
    principalId: testApplicationOid
  }
}

output WPS_CONNECTION_STRING string = listKeys(webPubSub.id, apiVersion).primaryConnectionString
output WPS_API_KEY string = listKeys(webPubSub.id, apiVersion).primaryKey
output WPS_ENDPOINT string = split(split(listKeys(webPubSub.id, apiVersion).primaryConnectionString, ';')[0], '=')[1]
output WPS_REVERSE_PROXY_ENDPOINT string = split(split(listKeys(webPubSub.id, apiVersion).primaryConnectionString, ';')[0], '=')[1]

param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string

var taRoleId = 'a97b65f3-24c7-4388-baec-2e87135dc908'
var cognitiveAccountName = 'textanalytics-${baseName}'
var cognitiveApiVersion = '2024-04-01-preview'

resource cognitiveAccount 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: cognitiveAccountName
  location: location
  sku: {
    name: 'S'
  }
  kind: 'TextAnalytics'
  properties: {
    customSubDomainName: cognitiveAccountName
  }
}

resource cognitiveRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid('taRoleId', cognitiveAccountName)
  dependsOn: [
    cognitiveAccount
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', taRoleId)
    principalId: testApplicationOid
  }
}

output LANGUAGE_API_KEY string = listKeys(cognitiveAccount.id, cognitiveApiVersion).key1
output LANGUAGE_API_KEY_ALT string = listKeys(cognitiveAccount.id, cognitiveApiVersion).key2
output ENDPOINT string = cognitiveAccount.properties.endpoint

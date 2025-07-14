param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string
param supportsSafeSecretStandard bool = false

var taRoleId = 'a97b65f3-24c7-4388-baec-2e87135dc908'
var cognitiveAccountName = 'textanalytics-${baseName}'

resource cognitiveAccount 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: cognitiveAccountName
  location: location
  sku: {
    name: 'S'
  }
  kind: 'TextAnalytics'
  properties: {
    customSubDomainName: cognitiveAccountName
    disableLocalAuth: supportsSafeSecretStandard
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

output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output COGNITIVE_ACCOUNT_NAME string = cognitiveAccount.name
output LANGUAGE_ENDPOINT string = cognitiveAccount.properties.endpoint

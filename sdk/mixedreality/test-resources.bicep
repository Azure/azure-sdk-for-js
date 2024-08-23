param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string


var apiVersion = '2021-03-01-preview'
var asaAccountName = '${baseName}-asa-account'
var spatialAnchorOwnerRoleId = '70bbe301-9835-447d-afdd-19eb3167307c'
var remoteRenderingAdminRoleId = '3df8b902-2a6f-47c7-8cc5-360e9b272a7e'

resource spatialAnchorsAccount 'Microsoft.MixedReality/spatialAnchorsAccounts@2021-03-01-preview' = {
  name: asaAccountName
  location: location
}

resource spatialAnchorOwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(spatialAnchorsAccount.id, testApplicationOid, spatialAnchorOwnerRoleId)
  properties: {
    roleDefinitionId: spatialAnchorOwnerRoleId
    principalId: testApplicationOid
  }
}

resource remoteRenderingAdminRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(spatialAnchorsAccount.id, testApplicationOid, remoteRenderingAdminRoleId)
  properties: {
    roleDefinitionId: remoteRenderingAdminRoleId
    principalId: testApplicationOid
  }
}

output MIXEDREALITY_ACCOUNT_ID string = spatialAnchorsAccount.properties.accountId
output MIXEDREALITY_ACCOUNT_DOMAIN string = spatialAnchorsAccount.properties.accountDomain
output MIXEDREALITY_ACCOUNT_KEY string = listKeys(spatialAnchorsAccount.id, apiVersion).primaryKey

param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string


var apiVersion = '2021-03-01-preview'
var rrAccountName = '${baseName}-arr-account'
var remoteRenderingAdminRoleId = '3df8b902-2a6f-47c7-8cc5-360e9b272a7e'

resource remoteRenderingAccount 'Microsoft.MixedReality/remoteRenderingAccounts@2021-03-01-preview' = {
  name: rrAccountName
  location: location
}

resource remoteRenderingAdminRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(remoteRenderingAccount.id, testApplicationOid, remoteRenderingAdminRoleId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', remoteRenderingAdminRoleId)
    principalId: testApplicationOid
  }
}

output MIXEDREALITY_ACCOUNT_ID string = remoteRenderingAccount.properties.accountId
output MIXEDREALITY_ACCOUNT_DOMAIN string = remoteRenderingAccount.properties.accountDomain
output MIXEDREALITY_ACCOUNT_KEY string = listKeys(remoteRenderingAccount.id, apiVersion).primaryKey

param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string


var apiVersion = '2021-03-01-preview'
var asaAccountName = '${baseName}-asa-account'
var remoteRenderingClientRoleId = 'd39065c4-c120-43c9-ab0a-63eed9795f0a'

resource remoteRenderingAccount 'Microsoft.MixedReality/remoteRenderingAccounts@2021-03-01-preview' = {
  name: asaAccountName
  location: location
}

resource remoteRenderingAdminRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(remoteRenderingAccount.id, testApplicationOid, remoteRenderingClientRoleId)
  properties: {
    roleDefinitionId: remoteRenderingClientRoleId
    principalId: testApplicationOid
  }
}

output MIXEDREALITY_ACCOUNT_ID string = remoteRenderingAccount.properties.accountId
output MIXEDREALITY_ACCOUNT_DOMAIN string = remoteRenderingAccount.properties.accountDomain
output MIXEDREALITY_ACCOUNT_KEY string = listKeys(remoteRenderingAccount.id, apiVersion).primaryKey

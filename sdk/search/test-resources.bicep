param baseName string = resourceGroup().name
param testApplicationOid string
param supportsSafeSecretStandard bool = false
param searchEndpointSuffix string = 'search.windows.net'

resource searchService 'Microsoft.Search/searchServices@2024-06-01-preview' = {
  name: baseName
  location: resourceGroup().location
  sku: {
    name: 'basic'
  }
  properties: {
    disableLocalAuth: !supportsSafeSecretStandard
    replicaCount: 1
    partitionCount: 1
    hostingMode: 'default'
  }
}

resource adminRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(searchService.id, 'adminRoleAssignment')
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c')
    principalId: testApplicationOid
    principalType: 'ServicePrincipal'
  }
}

output ENDPOINT string = 'https://${baseName}.${searchEndpointSuffix}'

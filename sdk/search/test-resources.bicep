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

resource searchServiceRoleAssignment 'Microsoft.Authorization/roleAssignments@2018-09-01-preview' = {  
  name: guid(searchService.id, testApplicationOid, 'SearchServiceContributor')
  scope: resourceGroup()
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7ca78c08-252a-4471-8644-bb5ff32d4ba0')
    principalId: testApplicationOid
    principalType: 'ServicePrincipal'
  }
}

resource searchIndexDataRoleAssignment 'Microsoft.Authorization/roleAssignments@2018-09-01-preview' = {  
  name: guid(searchService.id, testApplicationOid, 'SearchIndexDataContributor')
  scope: resourceGroup()
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '8ebe5a00-799e-43f5-93ac-243d3dce84a7')
    principalId: testApplicationOid
    principalType: 'ServicePrincipal'
  }
}

output ENDPOINT string = 'https://${baseName}.${searchEndpointSuffix}'

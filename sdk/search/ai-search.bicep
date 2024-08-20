@description('The base resource name.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('The url suffix to use when accessing the search data plane.')
param searchEndpointSuffix string = 'search.windows.net'

@description('The Search service SKU to create.')
@allowed(['free', 'basic', 'standard'])
param searchSku string = 'basic'

@description('If set, the principal to be assigned index and query access.')
param principalId string?

resource searchService 'Microsoft.Search/searchServices@2023-11-01' = {
  name: baseName
  location: location
  sku: {
    name: searchSku
  }
  properties: {
    replicaCount: 3
    partitionCount: 3
    hostingMode: 'default'
    publicNetworkAccess: 'enabled'
    authOptions: {
      aadOrApiKey: {
        aadAuthFailureMode: 'http401WithBearerChallenge'
      }
    }
    semanticSearch: 'standard'
  }
}

resource searchIndexDataContributorRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  name: '8ebe5a00-799e-43f5-93ac-243d3dce84a7'
}

resource searchServiceContributorRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  name: '7ca78c08-252a-4471-8644-bb5ff32d4ba0'
}

resource searchIndexDataContributorRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (principalId != null) {
  name: guid(subscription().id, resourceGroup().id, baseName, searchIndexDataContributorRoleDefinition.id)
  scope: searchService
  properties: {
    roleDefinitionId: searchIndexDataContributorRoleDefinition.id
    principalId: principalId!
  }
}

resource searchServiceContributorRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (principalId != null) {
  name: guid(subscription().id, resourceGroup().id, baseName, searchServiceContributorRoleDefinition.id)
  scope: searchService
  properties: {
    roleDefinitionId: searchServiceContributorRoleDefinition.id
    principalId: principalId!
  }
}

output SEARCH_SERVICE_ENDPOINT string = 'https://${searchService.name}.${searchEndpointSuffix}'

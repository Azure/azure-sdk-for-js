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

@description('If set, the name of an existing Azure OpenAI deployment in this subscription.')
param openAIOverrideServiceName string?

@description('Required in conjunction with `openAIOverrideServiceName`. The name of the model deployment to use.')
param openAIDeploymentNameOverride string?

@description('In conjunction with `openAIOverrideServiceName`, the name of the resource group containing the existing Azure OpenAI deployment. Defaults to the deployment resource group.')
param openAIResourceGroupOverride string?

module openAIModule './openai.bicep' = {
  name: '${deployment().name}-Deploy-OpenAI'
  scope: openAIResourceGroupOverride == null ? resourceGroup() : resourceGroup(openAIResourceGroupOverride!)
  params: {
    baseName: baseName
    location: location
    principalId: principalId
    openAIOverrideServiceName: openAIOverrideServiceName
    openAIDeploymentNameOverride: openAIDeploymentNameOverride
    openAIResourceGroupOverride: openAIResourceGroupOverride
  }
}

module aiSearchModule './ai-search.bicep' = {
  name: '${deployment().name}-Deploy-AI-Search'
  scope: resourceGroup()
  params: {
    baseName: baseName
    location: location
    searchEndpointSuffix: searchEndpointSuffix
    searchSku: searchSku
    principalId: principalId
  }
}

output ENDPOINT string = aiSearchModule.outputs.SEARCH_SERVICE_ENDPOINT
output AZURE_OPENAI_ENDPOINT string = openAIModule.outputs.AZURE_OPENAI_ENDPOINT
output AZURE_OPENAI_DEPLOYMENT_NAME string = openAIModule.outputs.AZURE_OPENAI_DEPLOYMENT_NAME

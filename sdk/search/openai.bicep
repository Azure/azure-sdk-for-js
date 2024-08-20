@description('The base resource name.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('If set, the principal to be assigned query access.')
param principalId string?

@description('If set, the name of an existing Azure OpenAI deployment in this subscription.')
param openAIOverrideServiceName string?

@description('Required in conjunction with `openAIOverrideServiceName`. The name of the model deployment to use.')
param openAIDeploymentNameOverride string?

@description('In conjunction with `openAIOverrideServiceName`, the name of the resource group containing the existing Azure OpenAI deployment. Defaults to the deployment resource group.')
param openAIResourceGroupOverride string?

var deploymentResourceGroup = openAIResourceGroupOverride == null
  ? resourceGroup()
  : resourceGroup(openAIResourceGroupOverride!)

var shouldCreateOpenAIResources = openAIOverrideServiceName == null && openAIDeploymentNameOverride == null
var openAIOverrideIsValid = openAIOverrideServiceName != null && openAIDeploymentNameOverride != null

var openAIModelName = 'text-embedding-ada-002'

resource newOpenAIService 'Microsoft.CognitiveServices/accounts@2023-10-01-preview' = if (shouldCreateOpenAIResources) {
  name: baseName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'OpenAI'
  properties: {
    customSubDomainName: baseName
    publicNetworkAccess: 'Enabled'
  }
}

resource existingOpenAIService 'Microsoft.CognitiveServices/accounts@2023-10-01-preview' existing = if (openAIOverrideIsValid) {
  name: openAIOverrideServiceName ?? 'unreachable'
  scope: deploymentResourceGroup
}

resource openAIModelDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-10-01-preview' = if (shouldCreateOpenAIResources) {
  name: openAIModelName
  parent: newOpenAIService
  sku: {
    name: 'Standard'
    capacity: 120
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: openAIModelName
    }
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
    currentCapacity: 120
    raiPolicyName: raiPolicy.name
  }
}

resource raiPolicy 'Microsoft.CognitiveServices/accounts/raiPolicies@2023-10-01-preview' = if (shouldCreateOpenAIResources) {
  name: 'Microsoft.Default'
  parent: newOpenAIService
  properties: {
    mode: 'Blocking'
    contentFilters: [
      {
        name: 'Hate'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        name: 'Hate'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
      {
        name: 'Sexual'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        name: 'Sexual'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
      {
        name: 'Violence'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        name: 'Violence'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
      {
        name: 'Selfharm'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        name: 'Selfharm'
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
    ]
  }
}

var openAIService = (openAIOverrideIsValid ? existingOpenAIService : shouldCreateOpenAIResources ? newOpenAIService : null)!

resource cognitiveServicesOpenAIUserRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: openAIService
  name: '5e0bd9bd-7b93-4f28-af87-19fc36ad61bd'
}

resource cognitiveServicesOpenAIUserRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (principalId != null) {
  name: guid(subscription().id, resourceGroup().id, baseName, cognitiveServicesOpenAIUserRoleDefinition.id)
  scope: (openAIOverrideIsValid ? existingOpenAIService : shouldCreateOpenAIResources ? newOpenAIService : null)!
  properties: {
    roleDefinitionId: cognitiveServicesOpenAIUserRoleDefinition.id
    principalId: principalId!
  }
}

output AZURE_OPENAI_ENDPOINT string = openAIService.properties.endpoint
output AZURE_OPENAI_DEPLOYMENT_NAME string = openAIDeploymentNameOverride ?? openAIModelDeployment.name ?? 'unreachable'

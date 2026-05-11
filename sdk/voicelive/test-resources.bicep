@description('The base resource name for AI Services.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('The principal ID of the test application identity. Provided by New-TestResources.ps1 in CI; defaults to empty for local deploys.')
param testApplicationOid string = ''

param tagValues object = {}
param allowProjectManagement bool = true
param virtualNetworkType string = 'None'
param vnet object = {}
param ipRules array = []
param identity object = {
  type: 'SystemAssigned'
}

// Built-in role definition IDs
// "Azure AI User" - read/write on Foundry agents and projects
var azureAiUserRoleDefinitionId = '53ca6127-db72-4b80-b1b0-d745d6d5456d'

@description('The name of the OpenAI model you want to deploy')
param modelName string = 'gpt-4.1'

@description('The model format of the model you want to deploy. Example: OpenAI')
param modelFormat string = 'OpenAI'

@description('The version of the model you want to deploy. Example: 2024-11-20')
param modelVersion string = '2025-04-14'

@description('The SKU name for the model deployment. Example: GlobalStandard')
param modelSkuName string = 'GlobalStandard'

@description('The capacity of the model deployment in TPM.')
param modelCapacity int = 40

// Variables
var aiServicesName = '${baseName}-ai'
var defaultProjectName = '${toLower(baseName)}-ai-defaultproject'

// AI Services Account
resource aiServices 'Microsoft.CognitiveServices/accounts@2025-04-01-preview' = {
  name: aiServicesName
  location: location
  kind: 'AIServices'
  sku: {
    name: 'S0'
  }
  identity: identity
  tags: contains(tagValues, 'Microsoft.CognitiveServices/accounts') ? tagValues['Microsoft.CognitiveServices/accounts'] : {}
  properties: {
    customSubDomainName: toLower(aiServicesName)
    publicNetworkAccess: virtualNetworkType == 'Internal' ? 'Disabled' : 'Enabled'
    networkAcls: {
      defaultAction: virtualNetworkType == 'External' ? 'Deny' : 'Allow'
      virtualNetworkRules: virtualNetworkType == 'External' ? [
        {
          id: resourceId(vnet.resourceGroup, 'Microsoft.Network/virtualNetworks/subnets', vnet.name, vnet.subnets.subnet.name)
        }
      ] : []
      ipRules: empty(ipRules) || empty(ipRules[0].value) ? [] : ipRules
    }
    allowProjectManagement: allowProjectManagement
  }
}

// Default Project (child resource)
resource defaultProject 'Microsoft.CognitiveServices/accounts/projects@2025-04-01-preview' = {
  parent: aiServices
  name: defaultProjectName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  sku: {
    name: 'S0'
  }
  properties: {
    displayName: defaultProjectName
    description: 'Default project created with the resource'
  }
}

// Model Deployment
resource modelDeployment 'Microsoft.CognitiveServices/accounts/deployments@2024-10-01' = {
  parent: aiServices
  name: modelName
  sku: {
    capacity: modelCapacity
    name: modelSkuName
  }
  properties: {
    model: {
      name: modelName
      format: modelFormat
      version: modelVersion
    }
  }
}

// Grant the test application identity "Azure AI User" on the AI Services account so
// integration tests can list/create Foundry agents (e.g. AIProjectClient.agents.list()).
// Skipped when no test principal is supplied (local-only deploys).
resource agentRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(testApplicationOid)) {
  scope: aiServices
  name: guid(aiServices.id, testApplicationOid, azureAiUserRoleDefinitionId)
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', azureAiUserRoleDefinitionId)
    principalId: testApplicationOid
    principalType: 'ServicePrincipal'
  }
}

// Outputs
output AI_SERVICES_NAME string = aiServicesName
output AI_SERVICES_ENDPOINT string = aiServices.properties.endpoints['AI Foundry API']

@description('The primary key for the AI Services account. This is intentionally exposed for test resource deployment.')
#disable-next-line outputs-should-not-contain-secrets
output AI_SERVICES_KEY string = aiServices.listKeys().key1
output AI_SERVICES_ID string = aiServices.id
output MODEL_DEPLOYMENT_NAME string = modelName
output FOUNDRY_PROJECT_NAME string = defaultProjectName
output FOUNDRY_PROJECT_ENDPOINT string = defaultProject.properties.endpoints['AI Foundry API']

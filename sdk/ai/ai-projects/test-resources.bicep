@description('The base resource name for AI Services.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('Region for the AI Services account. Voice agents require gpt-realtime model availability.')
param aiServicesLocation string = 'eastus2'

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
// "Azure AI Account Owner" - full control-plane management of AI projects/accounts.
var azureAiAccountOwnerRoleDefinitionId = 'e47c6f54-e4a2-4754-9501-8e0985b135e1'

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

@description('The name of the gpt-realtime model deployment for voice agents')
param voiceModelName string = 'gpt-realtime'

@description('The version of the gpt-realtime model')
param voiceModelVersion string = '2025-01-15'

@description('The capacity for voice model deployment in TPM.')
param voiceModelCapacity int = 40

// Variables
var aiServicesName = '${baseName}-ai'
var defaultProjectName = '${toLower(baseName)}-ai-defaultproject'

// AI Services Account
resource aiServices 'Microsoft.CognitiveServices/accounts@2025-04-01-preview' = {
  name: aiServicesName
  location: aiServicesLocation
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
  location: aiServicesLocation
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

// Standard Model Deployment (e.g., gpt-4.1 for general operations)
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
    raiPolicyName: 'Microsoft.Default'
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
  }
  dependsOn: [
    defaultProject
  ]
}

// Voice Model Deployment (gpt-realtime for voice agents)
resource voiceModelDeployment 'Microsoft.CognitiveServices/accounts/deployments@2024-10-01' = {
  parent: aiServices
  name: voiceModelName
  sku: {
    capacity: voiceModelCapacity
    name: modelSkuName
  }
  properties: {
    model: {
      name: voiceModelName
      format: modelFormat
      version: voiceModelVersion
    }
    raiPolicyName: 'Microsoft.Default'
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
  }
  dependsOn: [
    defaultProject
  ]
}

// Assign the test application (if provided) the Azure AI Account Owner role on the project
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(testApplicationOid)) {
  scope: defaultProject
  name: guid(defaultProject.id, testApplicationOid, azureAiAccountOwnerRoleDefinitionId)
  properties: {
    roleDefinitionId: '/subscriptions/${subscription().subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/${azureAiAccountOwnerRoleDefinitionId}'
    principalId: testApplicationOid
  }
}

@description('The AI Services account name')
output ACCOUNT_NAME string = aiServices.name

@description('The AI Services account endpoint')
output FOUNDRY_PROJECT_ENDPOINT string = defaultProject.properties.endpoints['AI Foundry API']

@description('The resource group containing the deployed resources')
output AZURE_RESOURCE_GROUP string = resourceGroup().name

@description('The subscription ID containing the deployed resources')
output AZURE_SUBSCRIPTION_ID string = subscription().subscriptionId

@description('The voice model deployment name')
output FOUNDRY_VOICE_MODEL string = voiceModelName

@description('The base resource name for AI Services.')
param baseName string = resourceGroup().name

@description('Region for the AI Services account. Voice Agents realtime streaming requires a managed/realtime-capable model (e.g. gpt-realtime), which is only available in a subset of regions. eastus2 is what sdk/voicelive/test-resources.bicep already uses and documents as supporting "the full model set exercised by the live test matrix" (gpt-realtime, gpt-realtime-mini, phi4-mm-realtime, phi4-mini); westus2 deployment of gpt-realtime failed preflight validation in the CI test-resources subscription (buildId 6859739).')
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
// "Foundry User" - data-plane access for a Foundry project (create/read/update/delete agents,
// voice agents, realtime sessions, etc.), plus read-only control-plane access. The live tests
// only call data-plane APIs against the already-provisioned project below, so this (rather than
// a control-plane-only role such as "Foundry Account Owner", which has no data actions at all)
// is what the test principal actually needs.
var foundryUserRoleDefinitionId = '53ca6127-db72-4b80-b1b0-d745d6d5456d'

@description('The name of the realtime-capable model to deploy for Voice Agents live tests.')
param modelName string = 'gpt-realtime'

@description('The model format of the model you want to deploy. Example: OpenAI')
param modelFormat string = 'OpenAI'

@description('The version of the model you want to deploy. 2025-08-28 is the current default gpt-realtime version in eastus2 (verified via "az cognitiveservices model list --location eastus2"); the previous 2026-01-12 pin failed preflight validation for this model/account kind.')
param modelVersion string = '2025-08-28'

@description('The SKU name for the model deployment. Example: GlobalStandard')
param modelSkuName string = 'GlobalStandard'

@description('The capacity of the model deployment. Unlike general chat models, gpt-realtime is quota-limited in Requests Per Minute (RPM), not TPM, and the CI test-resources subscription only has 10 RPM available in eastus2 (buildId 6859756). The live tests only need to establish a handful of realtime sessions, and this deployment runs once per parallel test matrix job (5 in the current matrix) sharing that same quota pool, so keep this low.')
param modelCapacity int = 1

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

// Grant the test application identity "Foundry User" on the AI Services account so live tests
// can create/manage voice agents (e.g. AIProjectClient.agents.createVersion()).
// Skipped when no test principal is supplied (local-only deploys).
resource agentRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(testApplicationOid)) {
  scope: aiServices
  name: guid(aiServices.id, testApplicationOid, foundryUserRoleDefinitionId)
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', foundryUserRoleDefinitionId)
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

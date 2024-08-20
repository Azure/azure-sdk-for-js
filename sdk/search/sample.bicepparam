using './test-resources.bicep'

// default: resourceGroup().name
param baseName = 
//default: resourceGroup().location
param location = 
// default: 'search.windows.net'
param searchEndpointSuffix = 
//default: 'basic'
param searchSku = 
// Used to point the tests at an existing resource.
param openAIOverrideServiceName = 
// Used to point the tests at an existing model deployment. Must be set if and only if `openAIOverrideServiceName` is set.
param openAIDeploymentNameOverride = 
// Optional, but must not be set if `openAIOverrideServiceName` is not set. Used to point the tests at an existing resource in a different resource group. 
param openAIResourceGroupOverride = 
// Optional. Used for local testing by providing a user Object ID
param principalId = ''

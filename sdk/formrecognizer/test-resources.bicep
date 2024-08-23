param baseName string = resourceGroup().name
param location string = 'centralus'
param testApplicationOid string
param blobStorageAccount string = 'azuresdktrainingdata'
param trainingDataContainer string = 'trainingdata-v3'
param selectionMarkTrainingDataContainer string = 'selectionmark-v3'
param blobResourceId string = resourceId('2cd617ea-1866-46b1-90e3-fffb087ebf9b', 'TrainingData', 'Microsoft.Storage/storageAccounts', blobStorageAccount)
param trainingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${trainingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'PT2H')
  signedPermission: 'rl'
  signedResource: 'c'
}
param selectionMarkTrainingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${selectionMarkTrainingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'PT2H')
  signedPermission: 'rl'
  signedResource: 'c'
}
param testingDataContainer string = 'testingdata'
param testingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${testingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'PT2H')
  signedPermission: 'rl'
  signedResource: 'c'
}

var frRoleId = 'a97b65f3-24c7-4388-baec-2e87135dc908'
var apiVersion = '2024-04-01-preview'
var storageApiVersion = '2023-05-01'

// Create Cognitive Services Account for Form Recognizer
resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: baseName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'FormRecognizer'
  properties: {
    customSubDomainName: baseName
    publicNetworkAccess: 'Enabled'
  }
}

// Assign Role to the Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(frRoleId, baseName)
  dependsOn: [
    cognitiveServicesAccount
  ]
  properties: {
    principalId: testApplicationOid
    roleDefinitionId: frRoleId
  }
}

// Outputs
output FORM_RECOGNIZER_ENDPOINT string = cognitiveServicesAccount.properties.endpoint
output FORM_RECOGNIZER_API_KEY string = listKeys(cognitiveServicesAccount.id, apiVersion).key1
output FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${trainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, trainingDataSasProperties).serviceSasToken}'
output FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${testingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, testingDataSasProperties).serviceSasToken}'
output FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${selectionMarkTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, selectionMarkTrainingDataSasProperties).serviceSasToken}'
output FORM_RECOGNIZER_TARGET_RESOURCE_REGION string = location
output FORM_RECOGNIZER_TARGET_RESOURCE_ID string = cognitiveServicesAccount.id

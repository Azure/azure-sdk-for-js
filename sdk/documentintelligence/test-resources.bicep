param baseName string = resourceGroup().name
param location string = 'eastus'
param blobStorageAccount string = 'azuresdktrainingdata'
param trainingDataContainer string = 'trainingdata-v3'
param batchTrainingDataContainer string = 'trainingdata-batch'
param selectionMarkTrainingDataContainer string = 'selectionmark-v3'
param blobResourceId string = resourceId('2cd617ea-1866-46b1-90e3-fffb087ebf9b', 'TrainingData', 'Microsoft.Storage/storageAccounts', blobStorageAccount)
param trainingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${trainingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'P2M')
  signedPermission: 'rl'
  signedResource: 'c'
}
param batchTrainingSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${batchTrainingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'P2M')
  signedPermission: 'rwl'
  signedResource: 'c'
}
param selectionMarkTrainingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${selectionMarkTrainingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'P2M')
  signedPermission: 'rl'
  signedResource: 'c'
}
param testingDataContainer string = 'testingdata'
param testingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${testingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'P2M')
  signedPermission: 'rl'
  signedResource: 'c'
}
param multiPageTestingDataContainer string = 'multipage-training-data-v3'
param multiPageTestingDataSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${multiPageTestingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'P2M')
  signedPermission: 'rl'
  signedResource: 'c'
}
param classifierTrainingDataContainer string = 'training-data-classifier'
param classifierTrainingSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${classifierTrainingDataContainer}'
  signedExpiry: dateTimeAdd(utcNow('u'), 'PT3H')
  signedPermission: 'rl'
  signedResource: 'c'
}

var apiVersion = '2024-04-01-preview'
var storageApiVersion = '2023-05-01'

resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: baseName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'FormRecognizer'
  properties: {
    customSubDomainName: baseName
  }
}

output DOCUMENT_INTELLIGENCE_ENDPOINT string = cognitiveServicesAccount.properties.endpoint
output DOCUMENT_INTELLIGENCE_API_KEY string = listKeys(cognitiveServicesAccount.id, apiVersion).key1
output DOCUMENT_INTELLIGENCE_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${trainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, trainingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${testingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, testingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_SELECTION_MARK_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${selectionMarkTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, selectionMarkTrainingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_CLASSIFIER_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${classifierTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, classifierTrainingSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_BATCH_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${batchTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, batchTrainingSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_MULTIPAGE_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${multiPageTestingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, multiPageTestingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_TARGET_RESOURCE_REGION string = location
output DOCUMENT_INTELLIGENCE_TARGET_RESOURCE_ID string = cognitiveServicesAccount.id

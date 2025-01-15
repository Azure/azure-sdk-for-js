param baseName string = resourceGroup().name
param location string = 'eastus'
param blobStorageAccount string = 'azuresdktrainingdatatme'
param trainingDataContainer string = 'trainingdata-v3'
param batchTrainingDataContainer string = 'trainingdata-batch'
param selectionMarkTrainingDataContainer string = 'selectionmark-v3'
param blobResourceId string = resourceId('4d042dc6-fe17-4698-a23f-ec6a8d1e98f4', 'static-test-resources', 'Microsoft.Storage/storageAccounts', blobStorageAccount)
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
param batchTrainingDataResultContainer string = 'trainingdata-batch-result'
param batchTrainingResultSasProperties object = {
  canonicalizedResource: '/blob/${blobStorageAccount}/${batchTrainingDataResultContainer}'
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

var apiVersion = '2024-10-01'
var storageApiVersion = '2023-05-01'
resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: baseName
  location: location
  kind: 'FormRecognizer'
  sku: { name: 'S0' }
  properties: { customSubDomainName: baseName }
}

output DOCUMENT_INTELLIGENCE_ENDPOINT string = cognitiveServicesAccount.properties.endpoint
output DOCUMENT_INTELLIGENCE_API_KEY string = listKeys(cognitiveServicesAccount.id, apiVersion).key1
output DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${trainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, trainingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${testingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, testingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${selectionMarkTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, selectionMarkTrainingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_CLASSIFIER_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${classifierTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, classifierTrainingSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_BATCH_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${batchTrainingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, batchTrainingSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_BATCH_TRAINING_DATA_RESULT_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${batchTrainingDataResultContainer}?${listServiceSas(blobResourceId, storageApiVersion, batchTrainingResultSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_MULTIPAGE_TRAINING_DATA_CONTAINER_SAS_URL string = '${reference(blobResourceId, storageApiVersion).primaryEndpoints.blob}${multiPageTestingDataContainer}?${listServiceSas(blobResourceId, storageApiVersion, multiPageTestingDataSasProperties).serviceSasToken}'
output DOCUMENT_INTELLIGENCE_TARGET_RESOURCE_REGION string = location
output DOCUMENT_INTELLIGENCE_TARGET_RESOURCE_ID string = cognitiveServicesAccount.id

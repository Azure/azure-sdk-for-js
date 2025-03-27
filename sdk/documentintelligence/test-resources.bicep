param baseName string = resourceGroup().name
param location string = 'eastus'
param supportsSafeSecretStandard bool = false
param storageResourceGroup string = 'static-test-resources'
param blobStorageAccount string = 'azuresdktrainingdatatme'
param trainingDataContainer string = 'trainingdata-v3'
param batchTrainingDataContainer string = 'trainingdata-batch'
param selectionMarkTrainingDataContainer string = 'selectionmark-v3'
param batchTrainingDataResultContainer string = 'trainingdata-batch-result'
param testingDataContainer string = 'testingdata'
param multiPageTestingDataContainer string = 'multipage-training-data-v3'
param classifierTrainingDataContainer string = 'training-data-classifier'

resource cognitiveServicesAccount 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: baseName
  location: location
  kind: 'FormRecognizer'
  sku: { name: 'S0' }
  properties: { 
    customSubDomainName: baseName
    disableLocalAuth: supportsSafeSecretStandard
    publicNetworkAccess: 'Enabled'
  }
}

output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output COGNITIVE_ACCOUNT_NAME string = cognitiveServicesAccount.name
output STORAGE_ACCOUNT_NAME string = blobStorageAccount
output STORAGE_RESOURCE_GROUP string = storageResourceGroup
output CONTAINER_TRAINING_DATA string = trainingDataContainer
output CONTAINER_BATCH_TRAINING_DATA string = batchTrainingDataContainer
output CONTAINER_BATCH_TRAINING_RESULT string = batchTrainingDataResultContainer
output CONTAINER_SELECTION_MARK_TRAINING_DATA string = selectionMarkTrainingDataContainer
output CONTAINER_TESTING_DATA string = testingDataContainer
output CONTAINER_MULTI_PAGE_TESTING_DATA string = multiPageTestingDataContainer
output CONTAINER_CLASSIFIER_TRAINING_DATA string = classifierTrainingDataContainer
output DOCUMENT_INTELLIGENCE_ENDPOINT string = cognitiveServicesAccount.properties.endpoint

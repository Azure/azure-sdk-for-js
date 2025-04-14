param baseName string = resourceGroup().name
param sku string = 'Standard'
param uniqueString string = newGuid()
param supportsSafeSecretStandard bool = false
param testApplicationOid string

var roleDefinitionId = '5ae67dd6-50cb-40e7-96ff-dc2bfa4b606b'
var accountName = baseName
var testKeyName = 'test-key'

// App Configuration Store
resource configurationStore 'Microsoft.AppConfiguration/configurationStores@2024-05-01' = {
  name: accountName
  location: resourceGroup().location
  sku: {
    name: sku
  }
  properties: {
    disableLocalAuth: supportsSafeSecretStandard
  }
}

// Key-Value Pair in App Configuration Store
resource keyValue 'Microsoft.AppConfiguration/configurationStores/keyValues@2024-05-01' = {
  name: testKeyName
  properties: {
    value: uniqueString
    contentType: 'text/plain'
  }
  parent: configurationStore
}

// Assign Role to Test Application
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
    principalId: testApplicationOid
  }
}

// Outputs
output APPCONFIG_ENDPOINT string = configurationStore.properties.endpoint
output APPCONFIG_TEST_SETTING_KEY string = keyValue.name
output APPCONFIG_TEST_SETTING_EXPECTED_VALUE string = keyValue.properties.value

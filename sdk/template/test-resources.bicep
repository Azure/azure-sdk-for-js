param baseName string = resourceGroup().name
param sku string = 'Standard'
param uniqueString string = newGuid()
param testApplicationOid string

var roleDefinitionId = '5ae67dd6-50cb-40e7-96ff-dc2bfa4b606b'
var configurationApiVersion = '2020-07-01-preview'
var accountName = baseName
var testKeyName = 'test-key'

// App Configuration Store
resource configurationStore 'Microsoft.AppConfiguration/configurationStores@2023-09-01-preview' = {
  name: accountName
  location: resourceGroup().location
  sku: {
    name: sku
  }
}

// Key-Value Pair in App Configuration Store
resource keyValue 'Microsoft.AppConfiguration/configurationStores/keyValues@2023-09-01-preview' = {
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
output APPCONFIG_CONNECTION_STRING string = listKeys(configurationStore.id, configurationApiVersion).value[0].connectionString
output APPCONFIG_ENDPOINT string = configurationStore.properties.endpoint
output APPCONFIG_TEST_SETTING_KEY string = keyValue.name
output APPCONFIG_TEST_SETTING_EXPECTED_VALUE string = keyValue.properties.value

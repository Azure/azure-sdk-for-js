param baseName string = resourceGroup().name
param sku string = 'Standard'
param uniqueString string = newGuid()

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

// Outputs
output APPCONFIG_CONNECTION_STRING string = listKeys(configurationStore.id, configurationApiVersion).value[0].connectionString
output APPCONFIG_ENDPOINT string = configurationStore.properties.endpoint
output APPCONFIG_TEST_SETTING_KEY string = keyValue.name
output APPCONFIG_TEST_SETTING_EXPECTED_VALUE string = keyValue.properties.value

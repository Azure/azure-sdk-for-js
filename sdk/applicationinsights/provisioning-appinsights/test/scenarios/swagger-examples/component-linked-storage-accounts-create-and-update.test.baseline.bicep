targetScope = 'resourceGroup'

resource component 'Microsoft.Insights/components@2020-02-02' = {
  name: 'myComponent'
  kind: 'web'
  location: 'eastus'
  properties: {
    Application_Type: 'web'
  }
}

resource linkedStorageAccount 'Microsoft.Insights/components/linkedStorageAccounts@2020-03-01-preview' = {
  name: 'ServiceProfiler'
  parent: component
  properties: {
    linkedStorageAccount: '/subscriptions/86dc51d3-92ed-4d7e-947a-775ea79b4918/resourceGroups/someResourceGroupName/providers/Microsoft.Storage/storageAccounts/storageaccountname'
  }
}

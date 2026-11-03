targetScope = 'resourceGroup'

resource component 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi01'
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
    linkedStorageAccount: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/storageaccountname'
  }
}

targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'learn-linked-storage-ws'
  location: 'eastus'
}

resource linkedStorageAccount 'Microsoft.OperationalInsights/workspaces/linkedStorageAccounts@2026-03-01' = {
  name: 'CustomLogs'
  parent: workspace
  properties: {
    storageAccountIds: [
      '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/learnstorage'
    ]
  }
}

targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'linked-storage-ws'
  location: 'eastus'
}

resource linkedStorageAccount 'Microsoft.OperationalInsights/workspaces/linkedStorageAccounts@2026-03-01' = {
  name: 'CustomLogs'
  parent: workspace
  properties: {
    storageAccountIds: [
      '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mms-eus/providers/Microsoft.Storage/storageAccounts/testStorageA'
      '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mms-eus/providers/Microsoft.Storage/storageAccounts/testStorageB'
    ]
  }
}

targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'learn-storage-insight-ws'
  location: 'eastus'
}

resource storageInsightConfig 'Microsoft.OperationalInsights/workspaces/storageInsightConfigs@2026-03-01' = {
  name: 'learn-storage-insight'
  parent: workspace
  properties: {
    containers: [
      'wad-iis-logfiles'
    ]
    storageAccount: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/learnstorage'
      key: 'key'
    }
    tables: [
      'WADWindowsEventLogsTable'
    ]
  }
}

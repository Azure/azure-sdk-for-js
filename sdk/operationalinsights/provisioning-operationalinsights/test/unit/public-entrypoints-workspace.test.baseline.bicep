targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'public-workspace'
  location: 'eastus'
  properties: {
    retentionInDays: 30
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource dataExport 'Microsoft.OperationalInsights/workspaces/dataExports@2026-03-01' = {
  name: 'public-export'
  parent: workspace
  properties: {
    destination: {
      resourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.EventHub/namespaces/public-eventhub'
    }
    tableNames: [
      'Heartbeat'
    ]
  }
}

resource dataSource 'Microsoft.OperationalInsights/workspaces/dataSources@2026-03-01' = {
  name: 'public-datasource'
  parent: workspace
  kind: 'AzureActivityLog'
  properties: {}
}

resource linkedService 'Microsoft.OperationalInsights/workspaces/linkedServices@2026-03-01' = {
  name: 'public-linked-service'
  parent: workspace
  properties: {}
}

resource linkedStorageAccount 'Microsoft.OperationalInsights/workspaces/linkedStorageAccounts@2026-03-01' = {
  name: 'CustomLogs'
  parent: workspace
  properties: {}
}

resource networkSecurityPerimeterConfiguration 'Microsoft.OperationalInsights/workspaces/networkSecurityPerimeterConfigurations@2026-03-01' existing = {
  name: 'public-nsp'
  parent: workspace
}

resource savedSearch 'Microsoft.OperationalInsights/workspaces/savedSearches@2026-03-01' = {
  name: 'public-saved-search'
  parent: workspace
  properties: {
    category: 'public'
    displayName: 'public saved search'
    query: 'Heartbeat | take 10'
  }
}

resource storageInsightConfig 'Microsoft.OperationalInsights/workspaces/storageInsightConfigs@2026-03-01' = {
  name: 'public-storage-insight'
  parent: workspace
  properties: {
    storageAccount: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/publicstorage'
      key: 'key'
    }
  }
}

resource summaryLog 'Microsoft.OperationalInsights/workspaces/summaryLogs@2026-03-01' = {
  name: 'publicsummary'
  parent: workspace
}

resource table 'Microsoft.OperationalInsights/workspaces/tables@2026-03-01' = {
  name: 'PublicTable_CL'
  parent: workspace
}

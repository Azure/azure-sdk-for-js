targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'learn-export-ws'
  location: 'eastus'
}

resource dataExport 'Microsoft.OperationalInsights/workspaces/dataExports@2026-03-01' = {
  name: 'learn-export'
  parent: workspace
  properties: {
    destination: {
      resourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.EventHub/namespaces/learn-eventhub'
    }
    tableNames: [
      'Heartbeat'
    ]
  }
}

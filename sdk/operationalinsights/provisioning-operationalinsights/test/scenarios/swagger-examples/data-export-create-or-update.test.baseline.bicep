targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'de-ws'
  location: 'eastus'
}

resource dataExport 'Microsoft.OperationalInsights/workspaces/dataExports@2026-03-01' = {
  name: 'export1'
  parent: workspace
  properties: {
    destination: {
      resourceId: '/subscriptions/192b9f85-a39a-4276-b96d-d5cd351703f9/resourceGroups/OIAutoRest1234/providers/Microsoft.EventHub/namespaces/test'
    }
    tableNames: [
      'Heartbeat'
    ]
  }
}

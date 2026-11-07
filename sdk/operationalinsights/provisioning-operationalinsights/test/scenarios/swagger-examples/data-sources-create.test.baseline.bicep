targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'datasource-ws'
  location: 'eastus'
}

resource dataSource 'Microsoft.OperationalInsights/workspaces/dataSources@2026-03-01' = {
  name: 'AzTestDS774'
  parent: workspace
  kind: 'AzureActivityLog'
  properties: {
    LinkedResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/providers/microsoft.insights/eventtypes/management'
  }
}

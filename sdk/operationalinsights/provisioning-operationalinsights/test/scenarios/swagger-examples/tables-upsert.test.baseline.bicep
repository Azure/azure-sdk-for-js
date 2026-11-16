targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'tables-ws'
  location: 'eastus'
}

resource table 'Microsoft.OperationalInsights/workspaces/tables@2026-03-01' = {
  name: 'AzureNetworkFlow'
  parent: workspace
  properties: {
    schema: {
      columns: [
        {
          name: 'MyNewColumn'
          type: 'guid'
        }
      ]
      name: 'AzureNetworkFlow'
    }
    retentionInDays: 45
    totalRetentionInDays: 70
  }
}

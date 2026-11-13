targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'summary-ws'
  location: 'eastus'
}

resource summaryLog 'Microsoft.OperationalInsights/workspaces/summaryLogs@2026-03-01' = {
  name: 'summarylogs1'
  parent: workspace
  properties: {
    ruleDefinition: {
      binDelay: 10
      binSize: 180
      destinationTable: 'MyDestinationTable_CL'
      query: 'MyTable_CL'
    }
    ruleType: 'User'
  }
}

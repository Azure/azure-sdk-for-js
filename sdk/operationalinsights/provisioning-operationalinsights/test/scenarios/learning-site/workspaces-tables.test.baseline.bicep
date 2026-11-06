targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'learn-tables-ws'
  location: 'eastus'
}

resource table 'Microsoft.OperationalInsights/workspaces/tables@2026-03-01' = {
  name: 'LearnTable_CL'
  parent: workspace
  properties: {
    schema: {
      columns: [
        {
          name: 'Message'
          type: 'string'
        }
      ]
      name: 'LearnTable_CL'
    }
    plan: 'Analytics'
  }
}

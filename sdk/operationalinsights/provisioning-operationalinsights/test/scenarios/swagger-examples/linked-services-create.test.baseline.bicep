targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'linked-service-ws'
  location: 'eastus'
}

resource linkedService 'Microsoft.OperationalInsights/workspaces/linkedServices@2026-03-01' = {
  name: 'Cluster'
  parent: workspace
  properties: {
    writeAccessResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mms-eus/providers/Microsoft.OperationalInsights/clusters/testcluster'
  }
}

targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'learn-linked-service-ws'
  location: 'eastus'
}

resource linkedService 'Microsoft.OperationalInsights/workspaces/linkedServices@2026-03-01' = {
  name: 'learn-linked-service'
  parent: workspace
  properties: {
    writeAccessResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.OperationalInsights/clusters/learn-cluster'
  }
}

targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'learn-saved-search-ws'
  location: 'eastus'
}

resource savedSearch 'Microsoft.OperationalInsights/workspaces/savedSearches@2026-03-01' = {
  name: 'learn-saved-search'
  parent: workspace
  properties: {
    category: 'learn'
    displayName: 'learn saved search'
    query: 'Heartbeat | take 10'
  }
}

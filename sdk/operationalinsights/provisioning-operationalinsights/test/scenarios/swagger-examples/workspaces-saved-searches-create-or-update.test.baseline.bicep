targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'TestWS'
  location: 'eastus'
}

resource savedSearch 'Microsoft.OperationalInsights/workspaces/savedSearches@2026-03-01' = {
  name: 'SavedSearchName'
  parent: workspace
  properties: {
    category: 'Saved Search Test Category'
    displayName: 'Create or Update Saved Search Test'
    functionAlias: 'heartbeat_func'
    functionParameters: 'a:int=1'
    query: 'Heartbeat | summarize Count() by Computer | take a'
    tags: [
      {
        name: 'Group'
        value: 'Computer'
      }
    ]
    version: 2
  }
}

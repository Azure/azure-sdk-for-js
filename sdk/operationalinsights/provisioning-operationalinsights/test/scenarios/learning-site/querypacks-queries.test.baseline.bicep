targetScope = 'resourceGroup'

resource queryPack 'Microsoft.OperationalInsights/queryPacks@2026-03-01' = {
  name: 'learn-query-pack'
  location: 'eastus'
  properties: {}
}

resource query 'Microsoft.OperationalInsights/queryPacks/queries@2026-03-01' = {
  name: 'learn-query'
  parent: queryPack
  properties: {
    body: 'Heartbeat | take 10'
    displayName: 'learn query'
  }
}

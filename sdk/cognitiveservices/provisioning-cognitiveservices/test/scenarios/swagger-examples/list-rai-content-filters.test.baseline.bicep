targetScope = 'resourceGroup'

resource raiContentFilter 'Microsoft.CognitiveServices/locations/raiContentFilters@2026-07-01' existing = {
  name: 'eastus/default'
}

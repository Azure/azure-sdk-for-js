targetScope = 'resourceGroup'

resource queryPack 'Microsoft.OperationalInsights/queryPacks@2026-03-01' = {
  name: 'my-querypack'
  location: 'South Central US'
  properties: {}
}

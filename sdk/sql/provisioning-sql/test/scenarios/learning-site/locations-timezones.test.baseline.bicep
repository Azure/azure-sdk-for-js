targetScope = 'subscription'

resource timeZone 'Microsoft.Sql/locations/timeZones@2025-01-01' existing = {
  name: 'eastus/locationstimezonesti'
}

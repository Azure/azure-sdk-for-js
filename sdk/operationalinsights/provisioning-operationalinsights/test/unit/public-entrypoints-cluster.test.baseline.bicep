targetScope = 'resourceGroup'

resource cluster 'Microsoft.OperationalInsights/clusters@2026-03-01' = {
  name: 'public-cluster'
  location: 'eastus'
  sku: {
    name: 'CapacityReservation'
    capacity: 100
  }
}

targetScope = 'resourceGroup'

resource cluster 'Microsoft.OperationalInsights/clusters@2026-03-01' = {
  name: 'learn-cluster'
  location: 'eastus'
  sku: {
    name: 'CapacityReservation'
    capacity: 100
  }
}

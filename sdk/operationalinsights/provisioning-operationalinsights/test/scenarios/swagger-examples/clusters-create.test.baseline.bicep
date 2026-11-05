targetScope = 'resourceGroup'

resource cluster 'Microsoft.OperationalInsights/clusters@2026-03-01' = {
  name: 'oiautorest6685'
  location: 'eastus'
  sku: {
    name: 'CapacityReservation'
    capacity: 100
  }
  tags: {
    tag1: 'val1'
  }
}

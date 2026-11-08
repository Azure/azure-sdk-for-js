targetScope = 'resourceGroup'

resource virtualCluster 'Microsoft.Sql/virtualClusters@2025-01-01' = {
  name: 'virtualclustersvirtu'
  location: 'eastus'
}

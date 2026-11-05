targetScope = 'resourceGroup'

resource virtualCluster 'Microsoft.Sql/virtualClusters@2025-01-01' = {
  name: 'publicentrypointsvir'
  location: 'eastus'
}

targetScope = 'resourceGroup'

resource serverTrustGroup 'Microsoft.Sql/locations/serverTrustGroups@2025-01-01' = {
  name: 'eastus/publicentrypointsser'
}

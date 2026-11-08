targetScope = 'resourceGroup'

resource instancePool 'Microsoft.Sql/instancePools@2025-01-01' = {
  name: 'publicentrypointsins'
  location: 'eastus'
}

resource operation 'Microsoft.Sql/instancePools/operations@2025-01-01' existing = {
  name: 'publicentrypointsins'
  parent: instancePool
}

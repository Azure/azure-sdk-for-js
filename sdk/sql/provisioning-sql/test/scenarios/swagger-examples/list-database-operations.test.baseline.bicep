targetScope = 'resourceGroup'

resource instancePool 'Microsoft.Sql/instancePools@2025-01-01' = {
  name: 'listdatabaseoperatio'
  location: 'eastus'
}

resource operation 'Microsoft.Sql/instancePools/operations@2025-01-01' existing = {
  name: 'listdatabaseoperatio'
  parent: instancePool
}

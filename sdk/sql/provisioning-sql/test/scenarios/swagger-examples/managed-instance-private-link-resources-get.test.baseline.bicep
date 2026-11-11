targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'test-cl'
  location: 'eastus'
}

resource privateLinkResource 'Microsoft.Sql/managedInstances/privateLinkResources@2025-01-01' existing = {
  name: 'managedinstancepriva'
  parent: managedInstance
}

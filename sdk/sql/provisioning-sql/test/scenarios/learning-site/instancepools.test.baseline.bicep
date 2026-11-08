targetScope = 'resourceGroup'

resource instancePool 'Microsoft.Sql/instancePools@2025-01-01' = {
  name: 'instancepoolsinstanc'
  location: 'eastus'
}

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'instancepoolsmanaged'
  location: 'eastus'
}

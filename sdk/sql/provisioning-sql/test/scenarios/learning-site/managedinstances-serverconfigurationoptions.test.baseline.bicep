targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesserv'
  location: 'eastus'
}

resource serverConfigurationOption 'Microsoft.Sql/managedInstances/serverConfigurationOptions@2025-01-01' = {
  name: 'allowPolybaseExport'
  parent: managedInstance
}

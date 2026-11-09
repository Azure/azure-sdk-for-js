targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesdist'
  location: 'eastus'
}

resource distributedAvailabilityGroup 'Microsoft.Sql/managedInstances/distributedAvailabilityGroups@2025-01-01' = {
  name: 'managedinstancesdist'
  parent: managedInstance
}

targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstanceskeys'
  location: 'eastus'
}

resource key 'Microsoft.Sql/managedInstances/keys@2025-01-01' = {
  name: 'managedinstanceskeys'
  parent: managedInstance
}

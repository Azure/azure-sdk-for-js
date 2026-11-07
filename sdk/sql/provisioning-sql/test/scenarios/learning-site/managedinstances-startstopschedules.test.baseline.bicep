targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesstar'
  location: 'eastus'
}

resource startStopSchedule 'Microsoft.Sql/managedInstances/startStopSchedules@2025-01-01' = {
  name: 'default'
  parent: managedInstance
}

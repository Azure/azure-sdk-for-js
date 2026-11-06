targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesdata'
  location: 'eastus'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'managedinstancesdata'
  parent: managedInstance
  location: 'eastus'
}

resource securityAlertPolicy 'Microsoft.Sql/managedInstances/databases/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: database
}

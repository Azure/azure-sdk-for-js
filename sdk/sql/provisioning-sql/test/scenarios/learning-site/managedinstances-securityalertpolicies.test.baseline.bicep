targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancessecu'
  location: 'eastus'
}

resource securityAlertPolicy 'Microsoft.Sql/managedInstances/securityAlertPolicies@2025-01-01' = {
  name: 'Default'
  parent: managedInstance
}

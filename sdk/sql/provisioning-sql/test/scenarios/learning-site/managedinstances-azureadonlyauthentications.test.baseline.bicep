targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesazur'
  location: 'eastus'
}

resource azureADOnlyAuthentication 'Microsoft.Sql/managedInstances/azureADOnlyAuthentications@2025-01-01' = {
  name: 'Default'
  parent: managedInstance
}

targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'testcl'
  location: 'eastus'
}

resource distributedAvailabilityGroup 'Microsoft.Sql/managedInstances/distributedAvailabilityGroups@2025-01-01' = {
  name: 'dag'
  parent: managedInstance
  properties: {
    databases: [
      {
        databaseName: 'testdb'
      }
    ]
    failoverMode: 'None'
    instanceAvailabilityGroupName: 'testcl'
    instanceLinkRole: 'Primary'
    partnerAvailabilityGroupName: 'BoxLocalAg1'
    partnerEndpoint: 'TCP://SERVER:7022'
    seedingMode: 'Automatic'
  }
}

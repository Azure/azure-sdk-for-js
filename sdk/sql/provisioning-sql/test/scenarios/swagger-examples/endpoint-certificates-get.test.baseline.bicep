targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'testcl'
  location: 'eastus'
}

resource endpointCertificate 'Microsoft.Sql/managedInstances/endpointCertificates@2025-01-01' existing = {
  name: 'endpointcertificates'
  parent: managedInstance
}

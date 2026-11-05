targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesserv'
  location: 'eastus'
}

resource serverTrustCertificate 'Microsoft.Sql/managedInstances/serverTrustCertificates@2025-01-01' = {
  name: 'managedinstancesserv'
  parent: managedInstance
}

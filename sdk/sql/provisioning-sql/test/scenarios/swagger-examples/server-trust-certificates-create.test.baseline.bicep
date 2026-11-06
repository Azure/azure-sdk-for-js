targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'testcl'
  location: 'eastus'
}

resource serverTrustCertificate 'Microsoft.Sql/managedInstances/serverTrustCertificates@2025-01-01' = {
  name: 'servertrustcertifica'
  parent: managedInstance
  properties: {
    publicBlob: '308203AE30820296A0030201020210'
  }
}

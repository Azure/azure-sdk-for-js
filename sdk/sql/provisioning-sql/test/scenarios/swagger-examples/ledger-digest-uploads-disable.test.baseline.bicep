targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'ledgerdigestuploadsd'
  location: 'eastus'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'testdb'
  parent: managedInstance
  location: 'eastus'
}

resource ledgerDigestUpload 'Microsoft.Sql/managedInstances/databases/ledgerDigestUploads@2025-01-01' = {
  name: 'current'
  parent: database
}

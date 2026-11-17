targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'myManagedInstanceName'
  location: 'eastus'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'myDatabase'
  parent: managedInstance
  location: 'eastus'
}

resource schema 'Microsoft.Sql/managedInstances/databases/schemas@2025-01-01' existing = {
  name: 'manageddatabasesensi'
  parent: database
}

resource table 'Microsoft.Sql/managedInstances/databases/schemas/tables@2025-01-01' existing = {
  name: 'manageddatabasesensi'
  parent: schema
}

resource column 'Microsoft.Sql/managedInstances/databases/schemas/tables/columns@2025-01-01' existing = {
  name: 'manageddatabasesensi'
  parent: table
}

resource sensitivityLabel 'Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels@2025-01-01' = {
  name: 'current'
  parent: column
}

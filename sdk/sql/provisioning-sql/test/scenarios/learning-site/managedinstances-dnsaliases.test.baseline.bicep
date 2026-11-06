targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesdnsa'
  location: 'eastus'
}

resource dnsAlias 'Microsoft.Sql/managedInstances/dnsAliases@2025-01-01' = {
  name: 'managedinstancesdnsa'
  parent: managedInstance
}

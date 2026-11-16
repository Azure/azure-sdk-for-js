targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'databaseadvancedthre'
  location: 'eastus'
}

resource advancedThreatProtectionSetting 'Microsoft.Sql/managedInstances/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: managedInstance
  properties: {
    state: 'Enabled'
  }
}

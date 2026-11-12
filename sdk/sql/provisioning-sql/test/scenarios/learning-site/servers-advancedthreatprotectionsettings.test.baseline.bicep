targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversadvancedthrea'
  location: 'eastus'
}

resource advancedThreatProtectionSetting 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: server
}

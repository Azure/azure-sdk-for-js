targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversencryptionpro'
  location: 'eastus'
}

resource encryptionProtector 'Microsoft.Sql/servers/encryptionProtector@2025-01-01' = {
  name: 'current'
  parent: server
}

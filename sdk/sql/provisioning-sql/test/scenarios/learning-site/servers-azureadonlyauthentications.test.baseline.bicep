targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversazureadonlyau'
  location: 'eastus'
}

resource azureADOnlyAuthentication 'Microsoft.Sql/servers/azureADOnlyAuthentications@2025-01-01' = {
  name: 'Default'
  parent: server
}

targetScope = 'resourceGroup'

resource instancePool 'Microsoft.Sql/instancePools@2025-01-01' = {
  name: 'listinstancepoolsbyr'
  location: 'eastus'
}

targetScope = 'resourceGroup'

resource workspace 'Microsoft.OperationalInsights/workspaces@2026-03-01' = {
  name: 'oiautorest6685'
  location: 'australiasoutheast'
  properties: {
    retentionInDays: 30
    sku: {
      name: 'PerGB2018'
    }
  }
  tags: {
    tag1: 'val1'
  }
}

targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqllogicalserverserv'
  location: 'eastus'
}

resource connectionPolicy 'Microsoft.Sql/servers/connectionPolicies@2025-01-01' = {
  name: 'default'
  parent: server
}

resource firewallRule 'Microsoft.Sql/servers/firewallRules@2025-01-01' = {
  name: 'sqllogicalserverfire'
  parent: server
}

resource advancedThreatProtectionSetting 'Microsoft.Sql/servers/advancedThreatProtectionSettings@2025-01-01' = {
  name: 'Default'
  parent: server
}

resource sqlVulnerabilityAssessment 'Microsoft.Sql/servers/sqlVulnerabilityAssessments@2025-01-01' = {
  name: 'default'
  parent: server
}

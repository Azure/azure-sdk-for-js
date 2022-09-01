@description('Ledger Name')
@metadata({ defaultValue: '0000-test-js' })
@minLength(3)
@maxLength(24)
param baseName string

@description('Oid of the user')
param principalId string = 'ec667af1-0642-45f0-be8a-b76758a35dde'

@description('Location for all resources.')
param location string = 'EastUS'
param tenantId string
param clientId string

var ledgerUri = 'https://${baseName}.confidential-ledger.azure.com'

resource baseName_resource 'Microsoft.ConfidentialLedger/ledgers@2020-12-01-preview' = {
  name: baseName
  location: location
  properties: {
    ledgerType: 'Public'
    aadBasedSecurityPrincipals: [
      {
        principalId: principalId
        tenantId: tenantId
        ledgerRoleName: 'Administrator'
      }
      {
        principalId: clientId
        ledgerRoleName: 'Administrator'
      }
    ]
  }
}

output LEDGER_NAME string = baseName
output LEDGERURI string = ledgerUri
output IDENTITY_SERVICE_URL string = 'https://identity.confidential-ledger.core.azure.com'
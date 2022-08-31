@description('Ledger Name')
@metadata({ defaultValue: '0000-test-js' })
@minLength(3)
@maxLength(24)
param baseName string

@description('Oid of the user')
param principalId string = 'ec667af1-0642-45f0-be8a-b76758a35dde'

@description('Location for all resources.')
param location string = 'EastUS'
param tenantId string = '72f988bf-86f1-41af-91ab-2d7cd011db47'
param clientId string = '11117bee-56a6-4430-9988-b8788a90c2e9'

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
output IDENTITY_SERVICE_URL string = 'https://identity.confidential-ledger.core.azure.com/ledgerIdentity/${baseName}'

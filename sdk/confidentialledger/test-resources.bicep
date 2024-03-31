@description('Ledger Name')
@minLength(3)
@maxLength(24)
param ledgerName string = 'tssdkci-${uniqueString(resourceGroup().id)}'
// resourceGroup().name is too long
// uniqueString is 13 characters long
// https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-string#uniquestring
// Prepend a string to easy identification + ledger name must start with a letter.

@description('Location for all resources.')
param location string = 'EastUS'
// Explicitly set a region due to regional restrictions e.g. ACL is not currently available in westus

param tenantId string
// Unlike most permissions, we need the Oid for the test app
param testApplicationOid string

var ledgerUri = 'https://${ledgerName}.confidential-ledger.azure.com'

resource baseName_resource 'Microsoft.ConfidentialLedger/ledgers@2020-12-01-preview' = {
  name: ledgerName
  location: location
  properties: {
    ledgerType: 'Public'
    aadBasedSecurityPrincipals: [
      {
        principalId: testApplicationOid
        tenantId: tenantId
        ledgerRoleName: 'Administrator'
      }
    ]
  }
}

output CONFIDENTIALLEDGER_CLIENT_OID string = testApplicationOid
output LEDGER_NAME string = ledgerName
output LEDGER_URI string = ledgerUri
output IDENTITY_SERVICE_URL string = 'https://identity.confidential-ledger.core.azure.com'

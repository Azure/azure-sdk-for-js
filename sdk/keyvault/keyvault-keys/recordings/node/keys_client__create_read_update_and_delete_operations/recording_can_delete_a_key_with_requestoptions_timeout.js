let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakeywithrequestOptionstimeout-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fa46a600-1ddb-4ccf-9629-a0a96d4ca7a6',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=13.66.244.203;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Jan 2020 02:54:58 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '05cc1b96-15f2-43d0-b1e5-235128ea1701',
  'x-ms-ests-server',
  '2.1.9898.10 - WST ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aj-UkZOBBr5OhZk6htoTgf8_aSJHAQAAAIIkr9UOAAAA; expires=Thu, 13-Feb-2020 02:54:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 14 Jan 2020 02:54:58 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakeywithrequestOptionstimeout-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakeywithrequestOptionstimeout-/f88f538709c64af6b1526953bb25b2db","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oSaBQQe8zBcQqmKxhuvBYaEMlVyo57YtyfukDBmz-LbX1FQiCL27Btode6s_nXBJEAl_FfnVDNUBnzruN5yPpmuLTq3PybRzpFrkhkhSsG9trcZKu1fi2VYtrDm7aVoSmf9Hcx63LZWr649d0FSW_edMn0WKdT9aF3De3B7-Jih3kG3NgcD1UM2iIE3rHkeKZeIP9dNa0H4g6Iq1pkitNA6z6zkyQwLIpDFbbjRJ0CIpA4ZLN0U0ERI627IhAWjET0gQjAel1HXGQ9U_H7eFfXEZHv9rR9K37chHw4XcnPAS7828qtGLnHXap1AJ6vgbviVxqIQ783mEkMDd5pfLBQ","e":"AQAB"},"attributes":{"enabled":true,"created":1578970499,"updated":1578970499,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e19a184b-fca0-4003-bba5-c2e4dec48a01',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=13.66.244.203;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Jan 2020 02:54:58 GMT',
  'Content-Length',
  '716'
]);

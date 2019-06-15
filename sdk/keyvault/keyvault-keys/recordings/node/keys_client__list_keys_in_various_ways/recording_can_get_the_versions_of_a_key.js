let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/key156056233575100728/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/key156056233575100728/1dc83c419b2d4c29a88488ffa3b302fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xqUwWweEUfEJmmAbM0DyWPStrCTZ-CchKH8ewBMD3rhIqFTq52CsFD-IPQXb1JQExwcpbTEDCRvLf-GFxtR0i-aJpnjj9x2uKBmEU1oLXKb2FW58OVMrQ1FRx7Q69I7lHSvhCpz0x_GlBXHZjcIKdzDN4lpk5JFzNrdrp3usO4QJQBJaBXPcga_wJvj_2o_UIlV-25xr8aLUY-bUJatcS6nR5men8T9tvbyOewazdTjpK_RPFCXCzJPh9avkjtT-yBACpDNehhzlgCa8kKFpU2446RCzPXVuyPSKVGio-osyp-ir9hd5adrDqIJUsBqLvmq_ODXea_nf7ICRu8fsjw","e":"AQAB"},"attributes":{"enabled":true,"created":1560562341,"updated":1560562341,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  'e1b7fd8e-9b18-4fb1-9e92-4c21325dffdd',
  'x-ms-keyvault-service-version',
  '1.1.0.866',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 15 Jun 2019 01:32:21 GMT',
  'Connection',
  'close',
  'Content-Length',
  '667' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/key156056233575100728/versions')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156056233575100728/1dc83c419b2d4c29a88488ffa3b302fa","attributes":{"enabled":true,"created":1560562341,"updated":1560562341,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
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
  'c9a9bd83-5d6d-4243-8952-e1693d7ce80e',
  'x-ms-keyvault-service-version',
  '1.1.0.866',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 15 Jun 2019 01:32:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '245' ]);


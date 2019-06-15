let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/key156056234729604662/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/key156056234729604662/0262f6dcaad745a7bbbe852381200b46","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wdHom1CFD65Barct-gIK_O53cRN18b67T52vr3GNBarUY3Nf27x7H-hztubCrw3MwqaonR1dS0BR4wtlXs2Re48vdE6G8IkO3Nc80XMiTbWIZyE2arZXdDq2wed0t3ZlcXR5uH9H4u1GIEHgRh-GEKUbwUQYvHCjXLhU8qRpznXZY2OjQflSF2uhRO7cfBgciCxE_u9J_dGMDkLcdA9RVHpSptunpwPRm-pgHO5B_FI6ksuSCwqwWmO-AWBV3_It7TA3d0mUs_0nRSDdfmrt14udaeLQIzEB-Vte_2hIWT9CSxxZVwpZLHu7xMAVuUceSubF3IkZgtkK9k_cdpJ0wQ","e":"AQAB"},"attributes":{"enabled":true,"created":1560562353,"updated":1560562353,"recoveryLevel":"Recoverable+Purgeable"}}, [ 'Cache-Control',
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
  '6ab3ad51-0bf2-42bd-96f3-e30dc5a85c53',
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
  'Sat, 15 Jun 2019 01:32:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '667' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/key156056234729604662/versions')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/key156056234729604662/0262f6dcaad745a7bbbe852381200b46","attributes":{"enabled":true,"created":1560562353,"updated":1560562353,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
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
  '92559418-3beb-4b81-95a2-225443092d89',
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
  'Sat, 15 Jun 2019 01:32:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '245' ]);


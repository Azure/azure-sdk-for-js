let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: CRUDKeyName"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '71',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2163742d-c5f4-41df-8e9a-66ecc48eb264',
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
  'Sat, 15 Jun 2019 01:32:10 GMT',
  'Connection',
  'close' ]);


let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/key156056287773600801/backup')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: key156056287773600801"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '81',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5f66d613-b2da-4ce5-9bad-c4b2d1c91878',
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
  'Sat, 15 Jun 2019 01:41:22 GMT',
  'Connection',
  'close' ]);


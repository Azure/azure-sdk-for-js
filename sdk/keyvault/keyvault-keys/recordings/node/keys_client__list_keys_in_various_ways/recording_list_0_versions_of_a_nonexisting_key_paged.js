let nock = require('nock');

module.exports.testInfo = {}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/key156056236432109819/versions')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [ 'Cache-Control',
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
  '2859b54d-2a16-4cde-864b-4760f8957432',
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
  'Sat, 15 Jun 2019 01:32:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '28' ]);


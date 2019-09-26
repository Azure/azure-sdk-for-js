let nock = require('nock');

module.exports.testInfo = {}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
  'feb99c50-9703-4973-aec4-9ebea7556400',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlCE3tHUNHtPkdZGHu4FEEA_aSJHDwAAAPJ9mtQOAAAA; expires=Thu, 18-Jul-2019 06:41:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; HttpOnly',
  'Date',
  'Tue, 18 Jun 2019 06:41:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName/backup')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '74',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '65fd28d4-5c39-406b-b44f-00b31f12bb17',
  'x-ms-keyvault-service-version',
  '1.1.0.866',
  'x-ms-keyvault-network-info',
  'addr=35.238.119.163;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jun 2019 06:41:52 GMT',
  'Connection',
  'close' ]);


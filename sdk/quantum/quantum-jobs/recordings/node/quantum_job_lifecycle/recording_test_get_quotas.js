let nock = require('nock');

module.exports.hash = "36bc82d6615a57a31c5dbf38d77c93b0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ce7bd34e-0000-0000-0000-000000000000&client_secret=clientsecret&scope=https%3A%2F%2Fquantum.microsoft.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e937e503-b996-4a47-99b3-39265f157d00',
  'x-ms-ests-server',
  '2.1.11444.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApRYdDAxJsJNsMFcPc8YFe1J_3RTAgAAAF5prNcOAAAA; expires=Fri, 05-Mar-2021 09:52:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Feb 2021 09:52:31 GMT',
  'Content-Length',
  '1323'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/quotas')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1ac58e4cba6a8961f3dfa685a2d26c5329ffdfe3f5d4d7eff79b5ae9b8f461f35d36a454d3ffa6e55bf6d56d934a7cf56757559ccf2fa6c465f7c514cebaaa9ce5bfa62dd1665f183ac6578db3be37b7b3b0ff6ee3ddcdff9f4dec1c1c1c3d147f3aa9c351f3dda19ef8c3e2a8b45d17ef46877871efcbdcaeba26288d5b29d97d71ffd92d17be0f77a3d69a675b1e2be09d8ad50dc191f3cf8f4e10efdefc13e3ff73f18c5e5745dd7f9b2fdfda7ab3510f5717c7f1a72af118ceee3778bcd8b6a99f750395f5d6440a047a96f0e8b3dfec3a2314494414cbee69c519f1164f6f98f1b91f166c8e0e5a3f4cd11273645df1f7db4ccdfb5cf8be5db8f1e2dd765f9","4bfe1fb6384d5b8c030000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Wed, 03 Feb 2021 09:52:31 GMT',
  'Connection',
  'close'
]);

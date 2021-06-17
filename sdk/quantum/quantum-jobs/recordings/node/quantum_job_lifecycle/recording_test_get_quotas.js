let nock = require('nock');

module.exports.hash = "36bc82d6615a57a31c5dbf38d77c93b0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ce7bd34e-0000-0000-0000-000000000000&client_secret=clientsecret&scope=https%3A%2F%2Fsanitized%2F")
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
  'fa25cd2a-9033-454d-980c-3d0947505200',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjOYKNDeKnVMgTu-D2lode4H9ySAAgAAAO6NXdgOAAAA; expires=Sat, 17-Jul-2021 18:39:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 18:39:43 GMT',
  'Content-Length',
  '1722'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/quotas')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1ac58e4cba6a8961f3dfa685a2d26c5329ffdfe3f5d4d7eff79b5ae9b8f461f35d36a454d3ffa6e55bf6d56d934a7cf56757559ccf2fa6c465f7c514cebaaa9ce5bfa62dd1665f183ac65783be39dd147f3aa9c35fa7b592c8af6a3477bfcc72aaf8b8adfaf96edbcbcfee8978cde039bd7eb4933ad8b15f744c03e08a1dd9d1dfef316282da7ebbace97edef3f5dad81988fd33747a1fbf8dd62f3a25ae69b50395f5d643f7bb8ece1f7cdb818047ab3f4cd61b18bdf2d1643f33388c80f895dbe3ffa6899bf6b9f17cbb71f3d5aaecbf2","97fc3ffdcf18f96b030000"], [
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
  'x-ms-request-id',
  '1b76ac1470a3a74c',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Thu, 17 Jun 2021 18:39:43 GMT',
  'Connection',
  'close'
]);

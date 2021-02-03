let nock = require('nock');

module.exports.hash = "36bc82d6615a57a31c5dbf38d77c93b0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=client_id&client_secret=client_secret&scope=https%3A%2F%2Fquantum.microsoft.com%2F.default")
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
  '3744b9d7-b2f8-41be-ad50-3c97de500801',
  'x-ms-ests-server',
  '2.1.11444.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aiq62V91jCVBkaDZx5ac5tFJ_3RTAQAAAB1brNcOAAAA; expires=Fri, 05-Mar-2021 08:51:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Feb 2021 08:51:41 GMT',
  'Content-Length',
  '1323'
]);

nock('https://location.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/subscription_id/resourceGroups/resource_group/providers/Microsoft.Quantum/workspaces/workspace_name/quotas')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1ac58e4cba6a8961f3dfa685a2d26c5329ffdfe3f5d4d7eff79b5ae9b8f461f35d36a454d3ffa6e55bf6d56d934a7cf56757559ccf2fa6c465f7c514cebaaa9ce5bfa62dd1665f183ac6578db3be39dfd9d834ff7f71fde3bf874979ffba38fe655396b3e7a445f8e3e2a8b45d17ef46877871efcbdcaeba262a0d5b29d97d71ffd92d17ba0f87a3d69a675b1e2ee09d8adb0dc1defdebb7fefdefd4ff776f7f8f9600c97d3755de7cbf6f79faed6c0d347f1fda9c8bd4630ba8fdf2d362faa65de43e57c759101811ea1be392cf6f80f8bc610510631f95a53c67d4690d9e73f6e44c69b2183978fd237479cd8147d7ff4d1327fd73e2f966f3f7ab45c97e5","2ff97f00125f1a768e030000"], [
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
  'Wed, 03 Feb 2021 08:51:42 GMT',
  'Connection',
  'close'
]);

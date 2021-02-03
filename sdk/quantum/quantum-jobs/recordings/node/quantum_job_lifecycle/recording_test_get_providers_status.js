let nock = require('nock');

module.exports.hash = "57249747666738457e74defda292e96a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ce7bd34e-0000-0000-0000-000000000000&client_secret=clientsecret&scope=https%3A%2F%2Fquantum.microsoft.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1323',
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
  '3cd6043e-3361-458a-829a-5654018a2200',
  'x-ms-ests-server',
  '2.1.11459.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApRYdDAxJsJNsMFcPc8YFe1J_3RTAQAAAF5prNcOAAAA; expires=Fri, 05-Mar-2021 09:52:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Feb 2021 09:52:30 GMT'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/providerStatus')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d1475f14d3ba6aaaf3f6a3d147d3755de7cbf6f8322bca6c5294457b4d2df4cf32a7166d565fe46de35e5f98d7c74db15897599bcfb2e532cfca6279313e5f5d64f4d2cd60b3cbbcce2ef29f58e7ebfc4db120f476461f356dd6ae9b97f4f9478f96ebb2fc25a35bf4b9bdcaea6c91b7797d5ee7f9cf3e06e8ae2cf3b2cd17abbcee23305dad09fa0fb1ff9ff51e6fa4f90f1f819ff52edb6cb2fe218f125dfeac77f28b16d36fb88fefff92ef8f3e5ae6efdae7c5f2ad7e","f6ff008e3aacf974040000"], [
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
  'Set-Cookie',
  'ARRAffinity=a80c7c3a42bc29f88c9055a7e2789984b224746994993027ab866c65455cca24;Path=/;HttpOnly;Secure;Domain=westus.quantum.azure.com',
  'Set-Cookie',
  'ARRAffinitySameSite=a80c7c3a42bc29f88c9055a7e2789984b224746994993027ab866c65455cca24;Path=/;HttpOnly;SameSite=None;Secure;Domain=westus.quantum.azure.com',
  'Date',
  'Wed, 03 Feb 2021 09:52:31 GMT',
  'Connection',
  'close'
]);

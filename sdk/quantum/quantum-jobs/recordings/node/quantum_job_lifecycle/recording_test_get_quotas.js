let nock = require('nock');

module.exports.hash = "f909c630ef6bc7852e8aad46732be7e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ce7bd34e-0000-0000-0000-000000000000&client_secret=clientsecret&scope=https%3A%2F%2Fquantum.microsoft.com%2F.default")
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
  '9734eb80-243f-4ebe-ad29-b6c942614201',
  'x-ms-ests-server',
  '2.1.11444.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au-JfYCfeJ1Os2_0kwujtZ7POrquAQAAANw-rdcOAAAA; expires=Sat, 06-Mar-2021 01:03:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Feb 2021 01:03:25 GMT'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/quotas')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1ac58e4cba6a8961f3dfa685a2d26c5329ffdfe3f5d4d7eff79b5ae9b8f461f35d36a454d3ffa6e55bf6d56d934a7cf56757559ccf2fa6c465f7c514cebaaa9ce5bfa62dd1665f183ac6578db3be39dbddd870f760e76ef1fc8f3707ff4d1bc2a67cd478fe8cbd14765b128da8f1eedf11fabbc2e2a86582ddb7979fdd12f19bd077eafd793665a172bee9b807dc328eeeeecf09fb74072395dd775be6c7fffe96a0d547d2cdf9f8adc6b04a1fbf8dd62f3a25ae69b50395f5d643f7bb8ece1f7cdb818047af3f6cd61b18bdf2d1643f33388c8d76220ee3f86cb20bb7c7ff4d1327fd73e2f966f3f7ab45c97e5","2ff97f0023254de58f030000"], [
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
  'Thu, 04 Feb 2021 01:03:25 GMT',
  'Connection',
  'close'
]);

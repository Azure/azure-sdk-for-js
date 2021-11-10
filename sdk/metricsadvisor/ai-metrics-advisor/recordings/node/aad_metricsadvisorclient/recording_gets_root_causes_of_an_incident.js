let nock = require('nock');

module.exports.hash = "472ae8b1f82a93f3a899f43727dc1307";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '474594d7-6b07-4f5b-b407-1b775a8c2900',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkuPA0OcKZJOtYobr7a3HDA; expires=Fri, 10-Dec-2021 02:07:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:14 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/045f03a31628d5938cd75cfdecfff045-17465dcc000/rootCause')
  .reply(200, {"value":[{"rootCause":{"dimension":{"region":"Beijing","category":"Handmade"}},"path":["category"],"score":0.05937581364487382,"description":"Increase on region = Beijing | category = Handmade contributes the most to current incident."}]}, [
  'Content-Length',
  '239',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9e5b8e9f-94c1-421c-9f57-acb93d52b390',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '9e5b8e9f-94c1-421c-9f57-acb93d52b390',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:15 GMT'
]);

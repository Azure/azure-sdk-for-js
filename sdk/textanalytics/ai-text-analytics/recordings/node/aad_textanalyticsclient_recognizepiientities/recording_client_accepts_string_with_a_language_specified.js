let nock = require('nock');

module.exports.hash = "2ca611f3621c54143b853db995d535a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '867e301a-6142-4a12-bd65-b27770d25000',
  'x-ms-ests-server',
  '2.1.11021.16 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AtAVNXxDnFtGto37-snEDfPIIHRUAQAAAK5c9NYOAAAA; expires=Fri, 16-Oct-2020 19:21:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 16 Sep 2020 19:21:17 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/entities/recognition/pii', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","id":"0","entities":[],"warnings":[]},{"redactedText":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","id":"1","entities":[],"warnings":[]},{"redactedText":"I went to see a movie on ******** and it was perfectly average, nothing more or less than I expected.","id":"2","entities":[{"text":"Saturday","category":"DateTime","subcategory":"Date","offset":25,"length":8,"confidenceScore":0.8}],"warnings":[]},{"redactedText":"I didn't like the last book I read at all.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '5ec51746-9895-4881-8e08-e3f6f954c17e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 16 Sep 2020 19:21:18 GMT'
]);

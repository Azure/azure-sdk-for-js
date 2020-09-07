let nock = require('nock');

module.exports.hash = "478153a23d876107580922f28fbb0568";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1329',
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
  '55462021-a24f-402f-aa4c-b6f35b7a4400',
  'x-ms-ests-server',
  '2.1.10985.18 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=Aow8XoC9MsdFiDvn6fnsvKnIIHRUAQAAAJIn4tYOAAAA; expires=Fri, 02-Oct-2020 23:53:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Sep 2020 23:53:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/linking', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","entities":[{"name":"Space Needle","matches":[{"text":"Space Needle","offset":65,"length":12,"confidenceScore":0.42}],"language":"en","id":"Space Needle","url":"https://en.wikipedia.org/wiki/Space_Needle","dataSource":"Wikipedia"},{"name":"Seattle","matches":[{"text":"Seattle","offset":26,"length":7,"confidenceScore":0.21}],"language":"en","id":"Seattle","url":"https://en.wikipedia.org/wiki/Seattle","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"name":"Space Needle","matches":[{"text":"Space Needle","offset":90,"length":12,"confidenceScore":0.36}],"language":"en","id":"Space Needle","url":"https://en.wikipedia.org/wiki/Space_Needle","dataSource":"Wikipedia"},{"name":"Seattle","matches":[{"text":"Seattle","offset":50,"length":7,"confidenceScore":0.2}],"language":"en","id":"Seattle","url":"https://en.wikipedia.org/wiki/Seattle","dataSource":"Wikipedia"}],"warnings":[]},{"id":"2","entities":[{"name":"Saturday","matches":[{"text":"Saturday","offset":25,"length":8,"confidenceScore":0.05}],"language":"en","id":"Saturday","url":"https://en.wikipedia.org/wiki/Saturday","dataSource":"Wikipedia"}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'ace69bb3-22ad-4aaf-b584-d17f1ac9d3d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Sep 2020 23:53:55 GMT'
]);

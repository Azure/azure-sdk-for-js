let nock = require('nock');

module.exports.hash = "aca0020df32a3f512c0fab5aece01369";

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
  '42fc99a0-cb49-44aa-82a8-6177cd2aab00',
  'x-ms-ests-server',
  '2.1.11021.16 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AqLFdyL5X8xKqgzX4zNB96HIIHRUAQAAAKxc9NYOAAAA; expires=Fri, 16-Oct-2020 19:21:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 16 Sep 2020 19:21:16 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/keyPhrases', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"4","text":"I didn't like the last book I read at all.","language":"en"},{"id":"5","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","language":"es"},{"id":"6","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","language":"es"}]})
  .reply(200, {"documents":[{"id":"1","keyPhrases":["week","Space Needle","wonderful trip","Seattle","times"],"warnings":[]},{"id":"2","keyPhrases":["entire trip","Seattle","Space Needle"],"warnings":[]},{"id":"3","keyPhrases":["movie"],"warnings":[]},{"id":"4","keyPhrases":["book"],"warnings":[]},{"id":"5","keyPhrases":["Monte Rainier","caminos"],"warnings":[]},{"id":"6","keyPhrases":["carretera","tráfico","día"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=6',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'ffd6f7b8-2044-439b-867a-f8855b81b3a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 16 Sep 2020 19:21:17 GMT'
]);

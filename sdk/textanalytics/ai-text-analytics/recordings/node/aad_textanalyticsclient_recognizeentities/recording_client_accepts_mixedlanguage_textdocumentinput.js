let nock = require('nock');

module.exports.hash = "904cbbd4332b47bcfd8b095dc3f81670";

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
  'c8f03239-efa1-4a6e-a8f2-2064c38f8f00',
  'x-ms-ests-server',
  '2.1.11021.16 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AnD0-2MjBGlBozN_-sk-F_DIIHRUAQAAAISX9dYOAAAA; expires=Sat, 17-Oct-2020 17:44:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Sep 2020 17:44:36 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/entities/recognition/general', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"4","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","language":"es"},{"id":"5","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","language":"es"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"1","entities":[{"text":"Seattle","category":"Location","subcategory":"GPE","offset":26,"length":7,"confidenceScore":0.75},{"text":"last week","category":"DateTime","subcategory":"DateRange","offset":34,"length":9,"confidenceScore":0.8},{"text":"2","category":"Quantity","subcategory":"Number","offset":78,"length":1,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Seattle","category":"Location","subcategory":"GPE","offset":50,"length":7,"confidenceScore":0.74}],"warnings":[]},{"id":"3","entities":[{"text":"Saturday","category":"DateTime","subcategory":"Date","offset":25,"length":8,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"Monte Rainier","category":"Location","offset":29,"length":13,"confidenceScore":0.7}],"warnings":[]},{"id":"5","entities":[{"text":"ayer","category":"DateTime","subcategory":"Date","offset":60,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=5',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '22ce49b2-da03-4463-84df-cfac05bdfc77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 17:44:36 GMT'
]);

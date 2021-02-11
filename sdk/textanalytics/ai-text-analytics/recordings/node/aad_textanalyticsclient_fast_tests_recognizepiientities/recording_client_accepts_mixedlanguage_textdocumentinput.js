let nock = require('nock');

module.exports.hash = "d8b8d1cfbcd4254f122b3b32edc99bf2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'bb65713e-244e-4b2e-8c69-a0f205f16d00',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmHBqVIckwtDuho0B4ajCTJz_bg1AQAAAAawftcOAAAA; expires=Fri, 29-Jan-2021 17:29:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:29:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/recognition/pii', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"4","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","language":"es"},{"id":"5","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","language":"es"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","id":"1","entities":[],"warnings":[]},{"redactedText":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","id":"2","entities":[],"warnings":[]},{"redactedText":"I went to see a movie on ******** and it was perfectly average, nothing more or less than I expected.","id":"3","entities":[{"text":"Saturday","category":"DateTime","subcategory":"Date","offset":25,"length":8,"confidenceScore":0.8}],"warnings":[]}],"errors":[{"id":"4","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"5","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=3',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'a0e57ccc-b16d-4d5a-95ee-27886f94fcdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:42 GMT'
]);

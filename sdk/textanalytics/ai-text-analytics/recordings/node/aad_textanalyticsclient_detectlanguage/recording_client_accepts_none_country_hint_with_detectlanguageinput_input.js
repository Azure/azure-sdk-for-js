let nock = require('nock');

module.exports.hash = "fac23089cd8c20684b1e16fb9b75e38c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '12212c07-3b6f-4abf-b810-5b3676f00f01',
  'x-ms-ests-server',
  '2.1.10104.13 - SAN ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Agg1gYJnBeRPjltof7Vl8_v0CyfMAQAAAGye69UOAAAA; expires=Sun, 29-Mar-2020 23:51:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 28 Feb 2020 23:51:07 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/languages', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","countryHint":""},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","countryHint":""},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","countryHint":""},{"id":"4","text":"I didn't like the last book I read at all.","countryHint":""},{"id":"5","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","countryHint":""},{"id":"6","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","countryHint":""}]})
  .reply(200, {"documents":[{"id":"1","detectedLanguages":[{"name":"English","iso6391Name":"en","score":1}]},{"id":"2","detectedLanguages":[{"name":"English","iso6391Name":"en","score":1}]},{"id":"3","detectedLanguages":[{"name":"English","iso6391Name":"en","score":1}]},{"id":"4","detectedLanguages":[{"name":"English","iso6391Name":"en","score":1}]},{"id":"5","detectedLanguages":[{"name":"Spanish","iso6391Name":"es","score":1}]},{"id":"6","detectedLanguages":[{"name":"Spanish","iso6391Name":"es","score":1}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=6',
  'x-envoy-upstream-service-time',
  '3',
  'apim-request-id',
  '3687ae63-0fed-4952-acbb-9f2c07a4b006',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 28 Feb 2020 23:51:07 GMT'
]);

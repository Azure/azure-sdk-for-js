let nock = require('nock');

module.exports.hash = "0d9fd78345ab8e17c9f5cfd8421adc82";

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
  'bb1a9745-55e2-4930-ac89-1e07edd52100',
  'x-ms-ests-server',
  '2.1.10946.17 - CHI ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoUF8mOYeWNFnk-iAU4K3SzIIHRUAQAAAMPkzdYOAAAA; expires=Thu, 17-Sep-2020 15:03:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 18 Aug 2020 15:03:31 GMT',
  'Content-Length',
  '1247'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/languages', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","countryHint":"us"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","countryHint":"us"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","countryHint":"us"},{"id":"3","text":"I didn't like the last book I read at all.","countryHint":"us"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":0.99},"warnings":[]},{"id":"1","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":0.99},"warnings":[]},{"id":"2","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"3","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":0.69},"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '1029',
  'apim-request-id',
  '9840b11b-9716-4739-a71d-af5cde719fde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 15:03:33 GMT'
]);

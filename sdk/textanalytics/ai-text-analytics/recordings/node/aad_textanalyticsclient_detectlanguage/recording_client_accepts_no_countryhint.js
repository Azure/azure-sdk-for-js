let nock = require('nock');

module.exports.hash = "af8c8297be9a9712e68c80995c87e65d";

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
  'd94ff381-8d9f-4a82-a9d5-3cde9d2b6000',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmBlsPAAPsNOoDQdbh_CQgNz_bg1AQAAAD8BSdcOAAAA; expires=Sun, 20-Dec-2020 00:13:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:13:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/languages', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","countryHint":"us"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","countryHint":"us"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","countryHint":"us"},{"id":"3","text":"I didn't like the last book I read at all.","countryHint":"us"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"1","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"2","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"3","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]}],"errors":[],"modelVersion":"2020-09-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '00aee542-3c0c-4802-879e-fdb7d0a32fe8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:51 GMT'
]);

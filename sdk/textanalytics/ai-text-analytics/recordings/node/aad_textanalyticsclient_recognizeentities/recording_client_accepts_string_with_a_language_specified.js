let nock = require('nock');

module.exports.hash = "2d7bcc39f892755d3840f414ad2ae80a";

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
  '55462021-a24f-402f-aa4c-b6f357794400',
  'x-ms-ests-server',
  '2.1.10985.18 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AlEB0a--USRDtpihpEhw-sPIIHRUAQAAAIsn4tYOAAAA; expires=Fri, 02-Oct-2020 23:53:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Sep 2020 23:53:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/recognition/general', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","entities":[{"text":"Seattle","category":"Location","subcategory":"GPE","offset":26,"length":7,"confidenceScore":0.75},{"text":"last week","category":"DateTime","subcategory":"DateRange","offset":34,"length":9,"confidenceScore":0.8},{"text":"2","category":"Quantity","subcategory":"Number","offset":78,"length":1,"confidenceScore":0.8}],"warnings":[]},{"id":"1","entities":[{"text":"Seattle","category":"Location","subcategory":"GPE","offset":50,"length":7,"confidenceScore":0.74}],"warnings":[]},{"id":"2","entities":[{"text":"Saturday","category":"DateTime","subcategory":"Date","offset":25,"length":8,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '08ac37a2-8790-41d0-9787-6cb4120e63ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Sep 2020 23:53:46 GMT'
]);

let nock = require('nock');

module.exports.hash = "919bcd1e61d53ef9171ac5312b7b0a8a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '1538d9fb-352a-4dbb-93a9-d1e1dff11300',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1BwAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:35:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/sentiment', {"documents":[{"id":"0","text":"The food and service is not good","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":32,"text":"The food and service is not good","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":13,"length":7,"text":"service","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":28,"length":4,"text":"good","isNegated":true}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '1093',
  'apim-request-id',
  '72bd8b92-d254-4d02-aabd-c04306d41e46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:58 GMT'
]);

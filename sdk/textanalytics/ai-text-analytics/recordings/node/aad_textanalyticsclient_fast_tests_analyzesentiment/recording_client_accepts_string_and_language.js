let nock = require('nock');

module.exports.hash = "ab00193669bfc618a2f0cb5282fcc4df";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '368aa02b-f487-4860-b012-8b90bcdb0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1AQAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:43:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:43:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/sentiment', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"positive","confidenceScores":{"positive":0.99,"neutral":0.01,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":0.99,"neutral":0.01,"negative":0},"offset":0,"length":86,"text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!"}],"warnings":[]},{"id":"1","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":58,"text":"Unfortunately, it rained during my entire trip to Seattle."},{"sentiment":"neutral","confidenceScores":{"positive":0.01,"neutral":0.7,"negative":0.29},"offset":59,"length":43,"text":"I didn't even get to visit the Space Needle"}],"warnings":[]},{"id":"2","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":101,"text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected."}],"warnings":[]},{"id":"3","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"offset":0,"length":42,"text":"I didn't like the last book I read at all."}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'd56a06d0-0622-44ea-b358-1ae1da85b769',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:18 GMT'
]);

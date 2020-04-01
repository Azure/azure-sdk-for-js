let nock = require('nock');

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
  'fb183bf6-1653-484a-bbb2-42b404e52f00',
  'x-ms-ests-server',
  '2.1.9987.14 - WST ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtWoshJ-UiBKkg-38J8Gnhb0CyfMAQAAAIhDzdUOAAAA; expires=Fri, 06-Mar-2020 23:15:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 05 Feb 2020 23:15:21 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/sentiment', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","sentiment":"positive","documentScores":{"positive":0.99,"neutral":0.01,"negative":0},"sentences":[{"sentiment":"positive","sentenceScores":{"positive":0.99,"neutral":0.01,"negative":0},"offset":0,"length":86}]},{"id":"1","sentiment":"negative","documentScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","sentenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":58},{"sentiment":"neutral","sentenceScores":{"positive":0.01,"neutral":0.7,"negative":0.29},"offset":59,"length":43}]},{"id":"2","sentiment":"positive","documentScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","sentenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":101}]},{"id":"3","sentiment":"negative","documentScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"sentences":[{"sentiment":"negative","sentenceScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"offset":0,"length":42}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '977b8c11-9143-4082-906d-15762bc83f57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Feb 2020 23:15:21 GMT'
]);

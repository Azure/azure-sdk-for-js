let nock = require('nock');

module.exports.hash = "47e313a8945dfadc8c8d81a348d7b581";

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
  'c669a0c6-d7ca-4b58-872c-d3db50241600',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnDg61_RWuhDm1vJrEL-TAVz_bg1AwAAAI6JxtcOAAAA; expires=Thu, 25-Mar-2021 05:28:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 05:28:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/sentiment', {"documents":[{"id":"0","text":"today is a hot day","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"neutral","confidenceScores":{"positive":0.1,"neutral":0.88,"negative":0.02},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.1,"neutral":0.88,"negative":0.02},"offset":0,"length":18,"text":"today is a hot day","targets":[],"assessments":[]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '821',
  'apim-request-id',
  'a38c95c1-4008-49fe-b107-93964137ac8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 05:28:54 GMT'
]);

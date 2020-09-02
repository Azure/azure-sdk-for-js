let nock = require('nock');

module.exports.hash = "a7a1829f9b82a080edfd7dfe61d6defc";

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
  '442dade3-6535-43e7-8587-58fa49f02900',
  'x-ms-ests-server',
  '2.1.10985.18 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=Ar_BQNDEyFtIuafOei_jVt3IIHRUAQAAAKOq4dYOAAAA; expires=Fri, 02-Oct-2020 15:00:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Sep 2020 15:00:50 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/sentiment', {"documents":[{"id":"0","text":"today is a hot day","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"neutral","confidenceScores":{"positive":0.1,"neutral":0.88,"negative":0.02},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.1,"neutral":0.88,"negative":0.02},"offset":0,"length":18,"text":"today is a hot day","aspects":[],"opinions":[]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'a4c506b4-ab64-4fa0-89b3-73262856fcd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Sep 2020 15:00:50 GMT'
]);

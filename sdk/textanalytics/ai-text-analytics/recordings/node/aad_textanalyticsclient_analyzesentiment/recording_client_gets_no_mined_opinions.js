let nock = require('nock');

module.exports.hash = "a7a1829f9b82a080edfd7dfe61d6defc";

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
  'b07ee0aa-5391-4adf-b6fc-348d60d92700',
  'x-ms-ests-server',
  '2.1.10946.15 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkTDdjuj0khPgpvWWmJyQJX0CyfMAQAAAHnFyNYOAAAA; expires=Sun, 13-Sep-2020 17:48:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 14 Aug 2020 17:48:42 GMT',
  'Content-Length',
  '1500'
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
  '927',
  'apim-request-id',
  '0aef989d-8a90-4ea4-b0b9-3690ca6842f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 14 Aug 2020 17:48:43 GMT'
]);

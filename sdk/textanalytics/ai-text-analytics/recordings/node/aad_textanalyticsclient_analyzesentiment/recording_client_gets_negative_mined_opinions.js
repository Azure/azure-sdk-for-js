let nock = require('nock');

module.exports.hash = "68302f99d3817e1eb81b4e89f876c157";

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
  'c843e61d-2f1e-44b1-8a96-ab14e5bb6100',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvCUDtyXyk5GllVbCI1yNBBz_bg1AQAAAD0BSdcOAAAA; expires=Sun, 20-Dec-2020 00:13:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:13:49 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/sentiment', {"documents":[{"id":"0","text":"The food and service is not good","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":32,"text":"The food and service is not good","aspects":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":4,"text":"food","relations":[{"relationType":"opinion","ref":"#/documents/0/sentences/0/opinions/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":13,"length":7,"text":"service","relations":[{"relationType":"opinion","ref":"#/documents/0/sentences/0/opinions/0"}]}],"opinions":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":28,"length":4,"text":"good","isNegated":true}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '559453bd-44dc-4062-bcca-409276c60926',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:50 GMT'
]);

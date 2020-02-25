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
  '73e53a21-494e-4cd3-9781-87206f671a00',
  'x-ms-ests-server',
  '2.1.9987.14 - SAN ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuIrWI54soxJrPmCo9b8UI70CyfMAQAAAJVDzdUOAAAA; expires=Fri, 06-Mar-2020 23:15:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 05 Feb 2020 23:15:33 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/entities/recognition/general', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"4","text":"I didn't like the last book I read at all.","language":"en"},{"id":"5","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","language":"es"},{"id":"6","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","language":"es"}]})
  .reply(200, {"documents":[{"id":"1","entities":[{"text":"Seattle","type":"Location","offset":26,"length":7,"score":0.8207470774650574},{"text":"last week","type":"DateTime","subtype":"DateRange","offset":34,"length":9,"score":0.8},{"text":"Space Needle","type":"Organization","offset":65,"length":12,"score":0.9418386816978455},{"text":"2","type":"Quantity","subtype":"Number","offset":78,"length":1,"score":0.8}]},{"id":"2","entities":[{"text":"Seattle","type":"Location","offset":50,"length":7,"score":0.9375514388084412},{"text":"Space Needle","type":"Organization","offset":90,"length":12,"score":0.7905220985412598}]},{"id":"3","entities":[{"text":"Saturday","type":"DateTime","subtype":"Date","offset":25,"length":8,"score":0.8}]},{"id":"4","entities":[]},{"id":"5","entities":[]},{"id":"6","entities":[{"text":"el día","type":"DateTime","subtype":"Date","offset":50,"length":6,"score":0.8},{"text":"ayer","type":"DateTime","subtype":"Date","offset":60,"length":4,"score":0.8}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=6',
  'x-envoy-upstream-service-time',
  '5036',
  'apim-request-id',
  '834ec67e-7573-4dc5-823e-292b458350b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Feb 2020 23:15:39 GMT'
]);

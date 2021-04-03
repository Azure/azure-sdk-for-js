let nock = require('nock');

module.exports.hash = "59ee5a608efaa642bf83c6e654966f55";

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
  '1fac1146-2021-4bcd-9d3a-9fec8d061500',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DgAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:36:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:36:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/keyPhrases', {"documents":[{"id":"0","text":"This is some text, but it doesn't matter.","language":"notalanguage"}]})
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: af,bg,ca,da,de,el,en,es,et,fi,fr,hr,hu,id,it,ja,ko,lv,nl,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sv,tr"}}}],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3',
  'apim-request-id',
  'fbbb89c2-1f1c-49e6-85cf-c7b0a1fbffa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:04 GMT'
]);

let nock = require('nock');

module.exports.hash = "7bbf70230103e271b4ad20bf8b34ad89";

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
  '7e6afc3f-0ea9-42c0-a0b1-05c6383e2400',
  'x-ms-ests-server',
  '2.1.11021.16 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AtGNKs_G-Y9Os5aUrJcQLNHIIHRUAQAAAIaX9dYOAAAA; expires=Sat, 17-Oct-2020 17:44:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Sep 2020 17:44:38 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/keyPhrases', {"documents":[{"id":"0","text":"This is some text, but it doesn't matter.","language":"notalanguage"}]})
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: af,bg,ca,da,de,el,en,es,et,fi,fr,hr,hu,id,it,ja,ko,lv,nl,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sv,tr"}}}],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2',
  'apim-request-id',
  '64379518-9f3b-461c-b54a-815b4f4eb431',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 17:44:38 GMT'
]);

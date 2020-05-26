let nock = require('nock');

module.exports.hash = "12e2b3b67f3a691671585c0eef389371";

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
  'b184a020-59b2-4c5b-a110-ada336362802',
  'x-ms-ests-server',
  '2.1.10571.11 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ah46_ACCqtlIvQcePhW09MX0CyfMAQAAADBGX9YOAAAA; expires=Thu, 25-Jun-2020 17:17:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 26 May 2020 17:17:36 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/sentiment', {"documents":[{"id":"0","text":"Hello world!","language":"notalanguage"}]})
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Supplied language not supported. Pass in one of: de,en,es,fr,it,ja,ko,nl,pt-PT,zh-Hans,zh-Hant"}}}],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2',
  'apim-request-id',
  '07cf977b-692b-4d70-8572-2deb789ad17c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 17:17:36 GMT'
]);

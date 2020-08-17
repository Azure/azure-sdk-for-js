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
  '9e8421ac-48c8-4c5a-8262-327de8f5a700',
  'x-ms-ests-server',
  '2.1.10946.15 - CHI ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AryKFSYTfJ5CmJ7qHi32oWDIIHRUAQAAAJLdzNYOAAAA; expires=Wed, 16-Sep-2020 20:20:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Mon, 17 Aug 2020 20:20:33 GMT',
  'Content-Length',
  '1247'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/sentiment', {"documents":[{"id":"0","text":"Hello world!","language":"notalanguage"}]})
  .reply(200, {"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: de,en,es,fr,it,ja,ko,nl,pt-PT,zh-Hans,zh-Hant"}}}],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1088',
  'apim-request-id',
  'e99f91dc-0adb-4a02-9211-6d5a9aaafff2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 17 Aug 2020 20:20:35 GMT'
]);

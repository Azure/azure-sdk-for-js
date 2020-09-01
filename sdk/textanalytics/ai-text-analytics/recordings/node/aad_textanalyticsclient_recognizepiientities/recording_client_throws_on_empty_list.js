let nock = require('nock');

module.exports.hash = "13ac6b6b83fdd82f8de04c5bcda6cd4f";

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
  '8159c9fc-cf9c-4202-ac2e-80bf4ac50300',
  'x-ms-ests-server',
  '2.1.10985.18 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=At19LEOE9URHoYrYpzntowDIIHRUAQAAANWb4NYOAAAA; expires=Thu, 01-Oct-2020 19:45:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Sep 2020 19:45:25 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/recognition/pii', {"documents":[]})
  .query(true)
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid Request.","innererror":{"code":"MissingInputRecords","message":"Missing input records."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '4',
  'apim-request-id',
  'dda94db1-f724-4e2f-85cd-21c87ea1013b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Sep 2020 19:45:25 GMT'
]);

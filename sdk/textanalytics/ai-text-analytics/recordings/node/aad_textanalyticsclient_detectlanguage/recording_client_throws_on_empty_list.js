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
  '7f0480ee-70c5-43a7-b271-8c73b6de1d00',
  'x-ms-ests-server',
  '2.1.9987.14 - SAN ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AiRv9V4Ae-VNmx-VfNAXGXf0CyfMAQAAAOBLzdUOAAAA; expires=Fri, 06-Mar-2020 23:50:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 05 Feb 2020 23:50:56 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/languages', {"documents":[]})
  .reply(400, {"error":{"code":"InvalidRequest","innerError":{"code":"MissingInputRecords","message":"Missing input records."},"message":"Invalid Request."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3',
  'apim-request-id',
  'a4f6c484-2925-4ff9-b831-bed64b1008e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Feb 2020 23:50:56 GMT'
]);

let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1500',
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
  'deb26552-7232-4222-9ddb-ee26f56b1000',
  'x-ms-ests-server',
  '2.1.11198.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhnC_Z6CzeRCoOartLbbTvr0CyfMAQAAAK6LLtcOAAAA; expires=Sun, 29-Nov-2020 22:33:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '5c96537e-bbb7-49d2-bd37-7747798c5f3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/8bea2f87-8586-4dc8-ab11-0d56a3c7d4c7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'dbf6ddfe-5059-432a-91a7-982d8701abbf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '185e70eb-9e2e-424f-8cd9-c2ebbd8b6f3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '26cdf6f8-ba13-4c95-ae3a-59168b0b523e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '561ec933-5cfe-42ed-9f48-5eb4b4b7a0b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '79bd5930-851c-41be-b54c-2d639ca241e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/8bea2f87-8586-4dc8-ab11-0d56a3c7d4c7')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=8bea2f87-8586-4dc8-ab11-0d56a3c7d4c7' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '81ada393-ebfc-409b-9150-c59caa39b808',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/85f64af2-84ff-4042-a41a-5e45f64fd1a6')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=85f64af2-84ff-4042-a41a-5e45f64fd1a6' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '47b66599-d9f2-4500-861b-65ace261c64f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=e26a1624-d605-4ac2-a5ec-b7d5bb2eb7b2' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'ea95fe7b-6122-4038-af7f-f823b264478c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/a4c607c0-6aee-4e32-a81e-531e080fed35')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=a4c607c0-6aee-4e32-a81e-531e080fed35' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '45f5e90d-5a27-4011-8015-1f761afd1a9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/04cbb804-a2c2-42a1-ac96-fab5c3676de6')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=04cbb804-a2c2-42a1-ac96-fab5c3676de6' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '36012c60-ae56-46ab-8df5-3c3f6cf5bc9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/967394f6-1d24-4978-98e3-f9db0f5e7987')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=967394f6-1d24-4978-98e3-f9db0f5e7987' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  '9bc2c9ac-d7ad-4852-925f-b2a3efa1dd28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:18 GMT'
]);

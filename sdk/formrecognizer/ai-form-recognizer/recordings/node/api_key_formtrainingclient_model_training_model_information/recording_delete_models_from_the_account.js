let nock = require('nock');

module.exports.hash = "98aacaa3c4cd6e8a687856c9c25251f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '0c51950d-ec15-4be3-8f32-66d64608cdcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/5cce29f7-8129-4298-a3a2-31b4331147f5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  'cc5853f3-208a-43de-949d-f2456b676b4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '9d575421-5891-4d1d-ab0a-88f5e4d24b89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '4dd18d00-d511-401b-a28d-c338689a630f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'f087c721-580f-4c33-8bcb-985dc1786740',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '37c52aff-158c-4906-a3d3-13d3aa6c6818',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/04092960-7a18-48ec-a3ff-d9d31e32ccf5')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=04092960-7a18-48ec-a3ff-d9d31e32ccf5' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '03363078-d539-4136-ad8a-3837ce5d5ae4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/5cce29f7-8129-4298-a3a2-31b4331147f5')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=5cce29f7-8129-4298-a3a2-31b4331147f5' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'd63d223e-3d3b-44ec-a480-04e78aa3c9da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=c6cb0894-acbb-4152-9b1b-c1ffa1fa7a5b' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '09bdac83-a07e-4578-b22a-3a7613fbc4e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/3fe12716-3902-45f3-9247-c0a4dfeedff8')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=3fe12716-3902-45f3-9247-c0a4dfeedff8' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '2a4c8313-7535-4179-8ca3-75212e3f08b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/56fe126e-d52c-49f2-95e0-286b3ba1ca4e')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=56fe126e-d52c-49f2-95e0-286b3ba1ca4e' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '5eb6a9df-63b4-45d8-b145-5824a186caae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models/b842da93-4b59-4068-ad24-549a333bc351')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=b842da93-4b59-4068-ad24-549a333bc351' not found."}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '0046c346-c950-45ad-8204-717d56c090dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 01:26:42 GMT'
]);

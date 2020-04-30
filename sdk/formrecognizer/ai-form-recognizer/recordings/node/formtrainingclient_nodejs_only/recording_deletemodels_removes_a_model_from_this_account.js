let nock = require('nock');

module.exports.hash = "7163f536689c7b486c61fe6c3e1f59b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'f3c3484b-67d0-42c3-ab69-09d46909e5cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:37:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7ba0a695-b76d-42b8-8bfa-7276059b6c03')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=7ba0a695-b76d-42b8-8bfa-7276059b6c03' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '19c47081-a3a7-4680-9c92-5137a5543047',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 06:37:10 GMT'
]);

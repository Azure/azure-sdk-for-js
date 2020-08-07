let nock = require('nock');

module.exports.hash = "1ec197f0621656ab6a4558468110f190";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'd68e22ee-9ad6-4580-a0ee-9bad4b7697bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/13fbcb8e-6aa2-46bb-936a-33fee97c4d04')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=13fbcb8e-6aa2-46bb-936a-33fee97c4d04' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '1d5acd2a-3a6a-44a7-8e38-f90c56b03ce6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:51 GMT'
]);

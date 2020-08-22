let nock = require('nock');

module.exports.hash = "1ec197f0621656ab6a4558468110f190";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '1ed8d86d-f10c-47bd-8137-31ad2501bafb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/52668b65-a619-42d0-bc3d-504b1df7124e')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=52668b65-a619-42d0-bc3d-504b1df7124e' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '694bee0f-5fdf-400f-a0ee-a9583bbfd7a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:42 GMT'
]);

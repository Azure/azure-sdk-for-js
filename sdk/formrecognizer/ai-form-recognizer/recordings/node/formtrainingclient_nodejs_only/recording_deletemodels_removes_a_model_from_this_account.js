let nock = require('nock');

module.exports.hash = "7163f536689c7b486c61fe6c3e1f59b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/formrecognizer/v2.0-preview/custom/models/9fc504f6-293c-4c40-a581-e41ae22b40e5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '6ef846ca-2218-4bd3-b6fc-9853c5f6b63b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/9fc504f6-293c-4c40-a581-e41ae22b40e5')
  .query(true)
  .reply(404, {"error":{"code":"1022","message":"Model with 'id=9fc504f6-293c-4c40-a581-e41ae22b40e5' not found."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '514d1cbb-49cc-4a43-86f3-c9c31c2ba4bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:37 GMT'
]);

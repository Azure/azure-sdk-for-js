let nock = require('nock');

module.exports.hash = "e7133185b4e1f69d21ad278acf8d91b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/895b820a-e812-468d-8c64-d6adec5b93ae')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'afc6a0ee-c005-49e1-b621-07f066b41314',
  'x-envoy-upstream-service-time',
  '379',
  'apim-request-id',
  'afc6a0ee-c005-49e1-b621-07f066b41314',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/895b820a-e812-468d-8c64-d6adec5b93ae')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9dac2e9f-e2c9-4aa6-bc4e-55b46d466e59',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '9dac2e9f-e2c9-4aa6-bc4e-55b46d466e59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:40 GMT'
]);

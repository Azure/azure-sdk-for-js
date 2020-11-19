let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5e5ea55c-c859-46fb-8633-656b7bee9c9b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9e83acb9-c092-4f8e-9801-6b5f477a28c4',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  '9e83acb9-c092-4f8e-9801-6b5f477a28c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5e5ea55c-c859-46fb-8633-656b7bee9c9b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0674b9d2-1e9a-4d6b-833c-cb5ea7a73530',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '0674b9d2-1e9a-4d6b-833c-cb5ea7a73530',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:28 GMT'
]);

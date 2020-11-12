let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3274d451-d0ed-4742-bec2-a322ffd2f018')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'faf1d061-645b-4816-8c07-c93516ab9924',
  'x-envoy-upstream-service-time',
  '541',
  'apim-request-id',
  'faf1d061-645b-4816-8c07-c93516ab9924',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3274d451-d0ed-4742-bec2-a322ffd2f018')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a497719c-fd3d-4d8b-b7dc-3a8648782104',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'a497719c-fd3d-4d8b-b7dc-3a8648782104',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:12 GMT'
]);

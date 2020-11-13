let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/9c107e23-c9f8-4c2c-a0df-60bd4718b262')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7b20abcd-20d5-46df-ac69-33ec7f353c32',
  'x-envoy-upstream-service-time',
  '473',
  'apim-request-id',
  '7b20abcd-20d5-46df-ac69-33ec7f353c32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9c107e23-c9f8-4c2c-a0df-60bd4718b262')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '706e3853-2eed-465f-a296-2e2b4a475b9e',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '706e3853-2eed-465f-a296-2e2b4a475b9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:50 GMT'
]);

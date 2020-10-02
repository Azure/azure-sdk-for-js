let nock = require('nock');

module.exports.hash = "c982a457b9fd8ab567248e3f4ff198b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7db2c68b-8325-4229-85e1-911837087e4f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2217e6a3-86a2-4534-8e56-e135e2328ad4',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  '2217e6a3-86a2-4534-8e56-e135e2328ad4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7db2c68b-8325-4229-85e1-911837087e4f')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '584e8ab1-b095-4d68-9c26-6a97a678acbe',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '584e8ab1-b095-4d68-9c26-6a97a678acbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:24 GMT'
]);

let nock = require('nock');

module.exports.hash = "aef32609bad8050faaf3949b7d010235";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3921e1b1-1269-49e5-904b-7d525e380d3c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '12ccb407-5969-4e00-9158-df0c9d0fec03',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '12ccb407-5969-4e00-9158-df0c9d0fec03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3921e1b1-1269-49e5-904b-7d525e380d3c')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2be1f988-e8be-4beb-911e-c1ea6f72d9f6',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '2be1f988-e8be-4beb-911e-c1ea6f72d9f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:31 GMT'
]);

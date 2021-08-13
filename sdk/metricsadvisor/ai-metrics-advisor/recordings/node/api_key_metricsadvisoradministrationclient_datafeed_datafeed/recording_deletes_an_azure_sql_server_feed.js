let nock = require('nock');

module.exports.hash = "b2209a17485822432cf80b656050872d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b88af029-dd7d-497a-87be-9ceacb9b9895')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b98aab30-e9e1-4855-8b79-24e7c409ec2b',
  'x-envoy-upstream-service-time',
  '412',
  'apim-request-id',
  'b98aab30-e9e1-4855-8b79-24e7c409ec2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b88af029-dd7d-497a-87be-9ceacb9b9895')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fac3e72b-dc94-4eb6-88cb-ecbac6d00043',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'fac3e72b-dc94-4eb6-88cb-ecbac6d00043',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:58 GMT'
]);

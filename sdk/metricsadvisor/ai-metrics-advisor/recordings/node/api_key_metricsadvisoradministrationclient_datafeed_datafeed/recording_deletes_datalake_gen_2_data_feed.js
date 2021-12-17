let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/8a16b9eb-6ead-4116-9cae-da52862aa00f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5bb395c0-3523-4b3f-be66-b54520fa0374',
  'x-envoy-upstream-service-time',
  '326',
  'apim-request-id',
  '5bb395c0-3523-4b3f-be66-b54520fa0374',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/8a16b9eb-6ead-4116-9cae-da52862aa00f')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c60f50ce-7c61-4448-962e-5cafb9f1c088',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'c60f50ce-7c61-4448-962e-5cafb9f1c088',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:26 GMT'
]);

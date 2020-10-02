let nock = require('nock');

module.exports.hash = "2c84b4e969abb5b51f988742af0d44fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6b1036c0-d7c2-43a5-b974-136aaaf362dc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b6264af1-24e2-4ebd-8c2a-d9c9a59aa3fb',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  'b6264af1-24e2-4ebd-8c2a-d9c9a59aa3fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:03:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6b1036c0-d7c2-43a5-b974-136aaaf362dc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5b13e1d8-a128-4dda-b76f-a052d1ba3570',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '5b13e1d8-a128-4dda-b76f-a052d1ba3570',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:03:02 GMT'
]);

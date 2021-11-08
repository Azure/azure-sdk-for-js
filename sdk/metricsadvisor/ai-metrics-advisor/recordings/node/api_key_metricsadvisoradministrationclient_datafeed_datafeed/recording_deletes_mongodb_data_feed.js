let nock = require('nock');

module.exports.hash = "70567b49536730af02fa9c4263794cca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f419107a-f0fb-43da-b9df-14c79780fa62')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f8df3b03-a424-46fd-8594-c083167ccbe0',
  'x-envoy-upstream-service-time',
  '447',
  'apim-request-id',
  'f8df3b03-a424-46fd-8594-c083167ccbe0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f419107a-f0fb-43da-b9df-14c79780fa62')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '047fda22-5173-43c6-84e2-614bee807e38',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '047fda22-5173-43c6-84e2-614bee807e38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:33 GMT'
]);

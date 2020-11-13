let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c5cc78ed-41ed-49fd-a594-526630c0e9e0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b9fd6320-00c4-4f4b-96d1-cecfc1f010a7',
  'x-envoy-upstream-service-time',
  '325',
  'apim-request-id',
  'b9fd6320-00c4-4f4b-96d1-cecfc1f010a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c5cc78ed-41ed-49fd-a594-526630c0e9e0')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8fd56d12-73a2-408c-80dd-e6bcdb19a974',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '8fd56d12-73a2-408c-80dd-e6bcdb19a974',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:53 GMT'
]);

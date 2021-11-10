let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/aee75965-9331-427a-a6c1-c9e5d3999ed1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7f4a3654-a738-40bc-8810-18ebf2dd4280',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '7f4a3654-a738-40bc-8810-18ebf2dd4280',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/aee75965-9331-427a-a6c1-c9e5d3999ed1')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'feac2d6e-1ae4-4851-abf3-2500adf533c0',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'feac2d6e-1ae4-4851-abf3-2500adf533c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:31 GMT'
]);

let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/c910532f-b41f-460f-af19-1c6c524b6562')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '53fa9763-31bf-40b7-bb48-337b28d4e843',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  '53fa9763-31bf-40b7-bb48-337b28d4e843',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c910532f-b41f-460f-af19-1c6c524b6562')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '185a3fd7-99d2-4b99-980f-34835c4fa106',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '185a3fd7-99d2-4b99-980f-34835c4fa106',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:32 GMT'
]);

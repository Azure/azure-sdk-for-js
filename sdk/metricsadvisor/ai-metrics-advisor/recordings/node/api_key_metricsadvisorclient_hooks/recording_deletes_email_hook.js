let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/604c4044-51e4-4456-b76b-82482d96b45a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '765a56d8-5752-4626-ad92-4c9bb3b1dcb8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '765a56d8-5752-4626-ad92-4c9bb3b1dcb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/604c4044-51e4-4456-b76b-82482d96b45a')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a95c1841-fdc8-496f-ab72-7a91284d9bd3',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'a95c1841-fdc8-496f-ab72-7a91284d9bd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:14 GMT'
]);

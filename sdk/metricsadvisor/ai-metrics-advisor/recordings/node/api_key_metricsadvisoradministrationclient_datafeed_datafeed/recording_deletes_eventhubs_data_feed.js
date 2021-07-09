let nock = require('nock');

module.exports.hash = "3b26ef694bf46025b536723153ef1756";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/38c952af-7a0c-403e-bdb0-f7576cf22575')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ce716c25-0f62-4dca-afb1-2f5467ad5890',
  'x-envoy-upstream-service-time',
  '5927',
  'apim-request-id',
  'ce716c25-0f62-4dca-afb1-2f5467ad5890',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:44:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/38c952af-7a0c-403e-bdb0-f7576cf22575')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '58bd34ce-1b51-45d7-a923-e727ec3cb2d0',
  'x-envoy-upstream-service-time',
  '5263',
  'apim-request-id',
  '58bd34ce-1b51-45d7-a923-e727ec3cb2d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:44:42 GMT'
]);

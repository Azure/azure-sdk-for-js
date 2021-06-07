let nock = require('nock');

module.exports.hash = "e861fad34764bb94bbe86bb80f21db40";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/800bcc70-1f2b-4ca9-937c-d19453993b74')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1f4b9e04-e10f-4429-80eb-fc96cbb6872a',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '1f4b9e04-e10f-4429-80eb-fc96cbb6872a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/800bcc70-1f2b-4ca9-937c-d19453993b74')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '64988c3d-2087-49e4-b8ac-922f38db8985',
  'x-envoy-upstream-service-time',
  '5097',
  'apim-request-id',
  '64988c3d-2087-49e4-b8ac-922f38db8985',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:33 GMT'
]);

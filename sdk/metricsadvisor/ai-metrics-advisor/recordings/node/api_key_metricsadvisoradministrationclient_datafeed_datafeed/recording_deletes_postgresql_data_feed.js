let nock = require('nock');

module.exports.hash = "e94fe8b844567fad45d46761354ccf88";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7f3ce8dd-7404-46f6-8993-ca7e29f6af34')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '357ec0e4-8c72-49f7-8920-5b787f2a1643',
  'x-envoy-upstream-service-time',
  '380',
  'apim-request-id',
  '357ec0e4-8c72-49f7-8920-5b787f2a1643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7f3ce8dd-7404-46f6-8993-ca7e29f6af34')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cf09061f-3347-44ce-b52a-9b918cb0dbff',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'cf09061f-3347-44ce-b52a-9b918cb0dbff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:25 GMT'
]);

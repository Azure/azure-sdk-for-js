let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/7ba3c3b1-f3d3-4598-ae87-ac584020c641')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '964f4a0a-c3f6-4558-805a-b8db06431863',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  '964f4a0a-c3f6-4558-805a-b8db06431863',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7ba3c3b1-f3d3-4598-ae87-ac584020c641')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b7b2c66b-ae37-47a4-b80a-8ca0ff3951fb',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'b7b2c66b-ae37-47a4-b80a-8ca0ff3951fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:53 GMT'
]);

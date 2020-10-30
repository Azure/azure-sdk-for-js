let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/76ee9de9-32a7-4abc-a00a-641d29cb4266')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b1c95828-53a1-434a-9b05-5a090b521f04',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'b1c95828-53a1-434a-9b05-5a090b521f04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:44 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/76ee9de9-32a7-4abc-a00a-641d29cb4266')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9747e0d4-a030-42bd-b6ec-4bf1da15de47',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '9747e0d4-a030-42bd-b6ec-4bf1da15de47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:44 GMT',
  'Connection',
  'close'
]);

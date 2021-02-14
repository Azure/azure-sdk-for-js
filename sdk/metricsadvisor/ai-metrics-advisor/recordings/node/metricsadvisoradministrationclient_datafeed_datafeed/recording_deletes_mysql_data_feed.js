let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/2becadba-5d0f-4a47-9fc9-7deb5f6e77fe')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '242e8960-c2bb-4b00-82a7-b24a33c255fc',
  'x-envoy-upstream-service-time',
  '313',
  'apim-request-id',
  '242e8960-c2bb-4b00-82a7-b24a33c255fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2becadba-5d0f-4a47-9fc9-7deb5f6e77fe')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '351d798c-b339-4e8f-932d-d6e4057a2a17',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '351d798c-b339-4e8f-932d-d6e4057a2a17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:34 GMT'
]);

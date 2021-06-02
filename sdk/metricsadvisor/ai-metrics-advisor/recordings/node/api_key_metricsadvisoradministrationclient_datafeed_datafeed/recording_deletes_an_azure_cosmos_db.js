let nock = require('nock');

module.exports.hash = "0fb281fee73aac4f977819f93d7967b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e24c3443-8be7-4b6b-bd87-fb684fea601d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '955fc53f-9594-4755-a751-83e191066731',
  'x-envoy-upstream-service-time',
  '430',
  'apim-request-id',
  '955fc53f-9594-4755-a751-83e191066731',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e24c3443-8be7-4b6b-bd87-fb684fea601d')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1db2df7a-3e3e-4497-88d1-d018ff86bce3',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '1db2df7a-3e3e-4497-88d1-d018ff86bce3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:31 GMT'
]);

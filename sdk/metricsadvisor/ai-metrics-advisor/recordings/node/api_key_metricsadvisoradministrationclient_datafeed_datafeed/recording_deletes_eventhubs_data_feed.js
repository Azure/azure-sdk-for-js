let nock = require('nock');

module.exports.hash = "3b26ef694bf46025b536723153ef1756";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/49afdaec-205b-4211-8020-56a7458063c2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '24dfcbc6-ba4c-45b4-9f19-98c141b9c83a',
  'x-envoy-upstream-service-time',
  '6082',
  'apim-request-id',
  '24dfcbc6-ba4c-45b4-9f19-98c141b9c83a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/49afdaec-205b-4211-8020-56a7458063c2')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b53ca28c-fbaf-4a8c-b738-d26533679f90',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  'b53ca28c-fbaf-4a8c-b738-d26533679f90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:31 GMT'
]);

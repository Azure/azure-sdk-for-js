let nock = require('nock');

module.exports.hash = "70567b49536730af02fa9c4263794cca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c7542764-70f0-4291-8a70-dc6940629fa9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a64ab799-7978-4598-821b-cd38b90bf896',
  'x-envoy-upstream-service-time',
  '268',
  'apim-request-id',
  'a64ab799-7978-4598-821b-cd38b90bf896',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c7542764-70f0-4291-8a70-dc6940629fa9')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '04292a8d-80d6-4044-ad06-655ed1402b1a',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '04292a8d-80d6-4044-ad06-655ed1402b1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:23 GMT'
]);

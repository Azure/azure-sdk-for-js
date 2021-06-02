let nock = require('nock');

module.exports.hash = "3467b9577b6a0cbbc2fd9cd5043145f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2bbec0e8-6f8a-497e-a970-72e1fcbaa6ed',
  'x-envoy-upstream-service-time',
  '5513',
  'apim-request-id',
  '2bbec0e8-6f8a-497e-a970-72e1fcbaa6ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '63346e20-a357-457d-9ecb-545675d941ba',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '63346e20-a357-457d-9ecb-545675d941ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:23 GMT'
]);

let nock = require('nock');

module.exports.hash = "0fb281fee73aac4f977819f93d7967b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/60991828-b7f6-48d8-ac55-18079cca3733')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4f899011-459c-40df-966a-18477f3861d7',
  'x-envoy-upstream-service-time',
  '359',
  'apim-request-id',
  '4f899011-459c-40df-966a-18477f3861d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/60991828-b7f6-48d8-ac55-18079cca3733')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6e10d8f0-0034-4af0-9eaa-2f6ce3e71c35',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '6e10d8f0-0034-4af0-9eaa-2f6ce3e71c35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:32 GMT'
]);

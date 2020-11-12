let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b0aab03b-b1fc-448a-827b-1c36dac53327')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8c7d777c-a097-474b-a9ba-61188608c397',
  'x-envoy-upstream-service-time',
  '873',
  'apim-request-id',
  '8c7d777c-a097-474b-a9ba-61188608c397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b0aab03b-b1fc-448a-827b-1c36dac53327')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f59be9af-43ab-4d0a-9d71-1eb46f820cf6',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'f59be9af-43ab-4d0a-9d71-1eb46f820cf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:24 GMT'
]);

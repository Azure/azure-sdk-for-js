let nock = require('nock');

module.exports.hash = "b852241e376de2fdd17ef49de4af315c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c6d3ec1c-4573-4ee3-bada-0231da203c3a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bb21a1cc-2400-4672-add9-23575c30016d',
  'x-envoy-upstream-service-time',
  '270',
  'apim-request-id',
  'bb21a1cc-2400-4672-add9-23575c30016d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c6d3ec1c-4573-4ee3-bada-0231da203c3a')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4b8de6d3-d2ea-4667-b17f-6ee303933da6',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '4b8de6d3-d2ea-4667-b17f-6ee303933da6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:48 GMT'
]);

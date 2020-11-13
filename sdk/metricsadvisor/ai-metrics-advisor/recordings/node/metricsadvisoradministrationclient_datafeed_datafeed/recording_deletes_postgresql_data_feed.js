let nock = require('nock');

module.exports.hash = "3699bb02532f560521c174b610eae6e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/2e7d3691-1dc2-4632-8116-bbe8cfa59335')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ba872b9d-c8ae-4e56-b5ee-1f59836581df',
  'x-envoy-upstream-service-time',
  '771',
  'apim-request-id',
  'ba872b9d-c8ae-4e56-b5ee-1f59836581df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2e7d3691-1dc2-4632-8116-bbe8cfa59335')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5f04db55-8c30-4d72-aff0-f748e4d23ec7',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '5f04db55-8c30-4d72-aff0-f748e4d23ec7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:33 GMT'
]);

let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c91ea6b5-ddd0-4e49-b386-d3882ceb3ebb')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '173c2fd6-f6ee-4a45-938b-8ef85dc73ca7',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  '173c2fd6-f6ee-4a45-938b-8ef85dc73ca7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c91ea6b5-ddd0-4e49-b386-d3882ceb3ebb')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1fd782be-5097-4516-af19-331461615b72',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '1fd782be-5097-4516-af19-331461615b72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:55 GMT'
]);

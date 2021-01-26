let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/62ea0636-0157-49fa-b855-b6c54360e5f8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f805158b-16e9-4939-b0bc-0ff88c810638',
  'x-envoy-upstream-service-time',
  '296',
  'apim-request-id',
  'f805158b-16e9-4939-b0bc-0ff88c810638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/62ea0636-0157-49fa-b855-b6c54360e5f8')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4c1eb7de-9dab-4b97-8514-78f9fc32dd68',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '4c1eb7de-9dab-4b97-8514-78f9fc32dd68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:32 GMT'
]);

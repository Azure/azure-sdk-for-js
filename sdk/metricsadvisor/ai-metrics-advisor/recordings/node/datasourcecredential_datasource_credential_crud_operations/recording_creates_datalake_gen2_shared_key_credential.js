let nock = require('nock');

module.exports.hash = "923cce575c1a21389e97385aa738e466";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-163702281643103059","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/54cb9964-58fa-496f-b408-479ef69a8965',
  'x-request-id',
  '6a92ac1d-d227-4d6f-9962-bdac74e1e2d6',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '6a92ac1d-d227-4d6f-9962-bdac74e1e2d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/54cb9964-58fa-496f-b408-479ef69a8965')
  .reply(200, {"dataSourceCredentialId":"54cb9964-58fa-496f-b408-479ef69a8965","dataSourceCredentialName":"js-test-datalakeCred-163702281643103059","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2261d283-c447-44ea-9063-8af211a50321',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '2261d283-c447-44ea-9063-8af211a50321',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:37 GMT'
]);

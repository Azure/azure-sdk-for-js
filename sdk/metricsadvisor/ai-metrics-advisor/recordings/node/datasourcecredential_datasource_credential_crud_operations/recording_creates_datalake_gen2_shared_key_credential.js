let nock = require('nock');

module.exports.hash = "923cce575c1a21389e97385aa738e466";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"DataLakeGen2SharedKey","dataSourceCredentialName":"js-test-datalakeCred-164264036985603664","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"accountKey":"account-key"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/d4348883-7f69-4f3e-9523-bde85ae79abb',
  'x-request-id',
  'd4f95332-e0a1-41a4-b56b-b85d84684104',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  'd4f95332-e0a1-41a4-b56b-b85d84684104',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d4348883-7f69-4f3e-9523-bde85ae79abb')
  .reply(200, {"dataSourceCredentialId":"d4348883-7f69-4f3e-9523-bde85ae79abb","dataSourceCredentialName":"js-test-datalakeCred-164264036985603664","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"DataLakeGen2SharedKey","parameters":{}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3ae5ff90-ba98-4418-a142-25913eb65175',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '3ae5ff90-ba98-4418-a142-25913eb65175',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:30 GMT'
]);

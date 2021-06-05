let nock = require('nock');

module.exports.hash = "15f2864573c02b91d7304ae7bc16c8d9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/58555126-95d2-4345-81a2-3486db9849bf', {"dataSourceCredentialType":"AzureSQLConnectionString","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"58555126-95d2-4345-81a2-3486db9849bf","dataSourceCredentialName":"ExampleCred","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '243',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd00ec901-b143-4c7a-8a09-a26dce907bff',
  'x-envoy-upstream-service-time',
  '688',
  'apim-request-id',
  'd00ec901-b143-4c7a-8a09-a26dce907bff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 23:26:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/58555126-95d2-4345-81a2-3486db9849bf')
  .reply(200, {"dataSourceCredentialId":"58555126-95d2-4345-81a2-3486db9849bf","dataSourceCredentialName":"ExampleCred","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '243',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eeb9efdc-36b3-4b06-95d3-838a727ea2b2',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'eeb9efdc-36b3-4b06-95d3-838a727ea2b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 23:26:50 GMT'
]);

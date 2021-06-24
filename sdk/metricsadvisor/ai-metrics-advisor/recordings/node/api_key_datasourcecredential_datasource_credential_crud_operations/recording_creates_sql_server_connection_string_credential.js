let nock = require('nock');

module.exports.hash = "894fa59e2e2b51e0001c34cd0cac56ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"ExampleCred","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/58555126-95d2-4345-81a2-3486db9849bf',
  'x-request-id',
  'af7f1a3e-a61b-49e7-b4de-d4b90b2960b2',
  'x-envoy-upstream-service-time',
  '458',
  'apim-request-id',
  'af7f1a3e-a61b-49e7-b4de-d4b90b2960b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 23:26:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/58555126-95d2-4345-81a2-3486db9849bf')
  .reply(200, {"dataSourceCredentialId":"58555126-95d2-4345-81a2-3486db9849bf","dataSourceCredentialName":"ExampleCred","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '243',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dcad9eef-18a1-4f6f-b6c7-d5b5432cf25e',
  'x-envoy-upstream-service-time',
  '246',
  'apim-request-id',
  'dcad9eef-18a1-4f6f-b6c7-d5b5432cf25e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 23:26:49 GMT'
]);

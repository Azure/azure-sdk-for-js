let nock = require('nock');

module.exports.hash = "fa3c76bf9f6192b425e9fdeaa7d98062";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/fd1ceed7-0f5a-4867-83f7-e5a75d128458', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-163978895648309718","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"fd1ceed7-0f5a-4867-83f7-e5a75d128458","dataSourceCredentialName":"js-test-sqlServerCred-163978895648309718","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6750831c-0456-4008-b94e-aabf6cf97b86',
  'x-envoy-upstream-service-time',
  '328',
  'apim-request-id',
  '6750831c-0456-4008-b94e-aabf6cf97b86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:57 GMT'
]);

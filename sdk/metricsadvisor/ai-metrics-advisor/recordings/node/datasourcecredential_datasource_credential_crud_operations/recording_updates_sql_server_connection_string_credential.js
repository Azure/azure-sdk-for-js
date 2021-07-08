let nock = require('nock');

module.exports.hash = "fa3c76bf9f6192b425e9fdeaa7d98062";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-162527918841004036","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86","dataSourceCredentialName":"js-test-sqlServerCred-162527918841004036","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c4e4734c-7cc0-4112-96ae-4ad863640e79',
  'x-envoy-upstream-service-time',
  '1183',
  'apim-request-id',
  'c4e4734c-7cc0-4112-96ae-4ad863640e79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:31 GMT'
]);

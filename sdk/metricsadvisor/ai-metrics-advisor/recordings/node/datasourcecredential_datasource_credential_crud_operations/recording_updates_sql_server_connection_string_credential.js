let nock = require('nock');

module.exports.hash = "fa3c76bf9f6192b425e9fdeaa7d98062";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/44d64215-151e-441d-a446-44477a71f5c6', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-163702281643106715","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"44d64215-151e-441d-a446-44477a71f5c6","dataSourceCredentialName":"js-test-sqlServerCred-163702281643106715","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cea0c529-f5bf-40bf-b165-24d4594d6b21',
  'x-envoy-upstream-service-time',
  '446',
  'apim-request-id',
  'cea0c529-f5bf-40bf-b165-24d4594d6b21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:36 GMT'
]);

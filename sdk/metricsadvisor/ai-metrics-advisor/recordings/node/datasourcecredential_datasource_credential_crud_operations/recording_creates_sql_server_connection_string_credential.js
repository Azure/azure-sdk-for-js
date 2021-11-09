let nock = require('nock');

module.exports.hash = "cb45fa53cb5d83c598a46274e82e7c8f";

module.exports.testInfo = {"uniqueName":{"js-test-sqlServerCred-":"js-test-sqlServerCred-163636434695301676","js-test-datalakeCred-":"js-test-datalakeCred-163636434695302037","js-test-servicePrincipalCred-":"js-test-servicePrincipalCred-163636434695309101","js-test-servicePrincipalInKVCred-":"js-test-servicePrincipalInKVCred-163636434695308176"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-163636434695301676","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/0da7e320-dfa8-4288-9550-4da9509f072a',
  'x-request-id',
  'b10e909c-78db-4f96-b695-64c0a158764c',
  'x-envoy-upstream-service-time',
  '314',
  'apim-request-id',
  'b10e909c-78db-4f96-b695-64c0a158764c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/0da7e320-dfa8-4288-9550-4da9509f072a')
  .reply(200, {"dataSourceCredentialId":"0da7e320-dfa8-4288-9550-4da9509f072a","dataSourceCredentialName":"js-test-sqlServerCred-163636434695301676","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '71cf2f6c-6247-4700-96f2-e072c9730f1a',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '71cf2f6c-6247-4700-96f2-e072c9730f1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:07 GMT'
]);

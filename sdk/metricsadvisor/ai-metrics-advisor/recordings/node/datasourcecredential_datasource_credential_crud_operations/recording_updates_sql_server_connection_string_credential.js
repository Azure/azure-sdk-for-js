let nock = require('nock');

module.exports.hash = "fa3c76bf9f6192b425e9fdeaa7d98062";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/0da7e320-dfa8-4288-9550-4da9509f072a', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-163636434695301676","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"0da7e320-dfa8-4288-9550-4da9509f072a","dataSourceCredentialName":"js-test-sqlServerCred-163636434695301676","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '133acbd3-8e79-4abf-96cc-9d80bbc1e770',
  'x-envoy-upstream-service-time',
  '449',
  'apim-request-id',
  '133acbd3-8e79-4abf-96cc-9d80bbc1e770',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:07 GMT'
]);

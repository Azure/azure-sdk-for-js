let nock = require('nock');

module.exports.hash = "3e76fa943e1b177525a3aa883b624b91";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-164160823668208076","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc","dataSourceCredentialName":"js-test-sqlServerCred-164160823668208076","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4d5c6ecd-83b8-4ab2-a15b-84ff75137dea',
  'x-envoy-upstream-service-time',
  '336',
  'apim-request-id',
  '4d5c6ecd-83b8-4ab2-a15b-84ff75137dea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:17 GMT'
]);

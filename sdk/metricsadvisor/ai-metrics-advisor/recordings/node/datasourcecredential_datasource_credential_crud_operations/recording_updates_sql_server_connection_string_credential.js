let nock = require('nock');

module.exports.hash = "3e76fa943e1b177525a3aa883b624b91";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/2527beee-a546-4f61-b95a-e807d5c645a2', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-164264036985608229","dataSourceCredentialDescription":"updated description","parameters":{"connectionString":"updated-string"}})
  .reply(200, {"dataSourceCredentialId":"2527beee-a546-4f61-b95a-e807d5c645a2","dataSourceCredentialName":"js-test-sqlServerCred-164264036985608229","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fc20b860-e0a9-435c-a9d0-1c755b6ea209',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  'fc20b860-e0a9-435c-a9d0-1c755b6ea209',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:30 GMT'
]);

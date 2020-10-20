let nock = require('nock');

module.exports.hash = "d42c0c3a7060cc9336fa15d242721f7f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '915247d9-b678-47c5-8a15-30f970740600',
  'x-ms-ests-server',
  '2.1.11239.6 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AheV5ZDP6gxAurLqtiEWV9BJ0eYvAQAAAIAgQNcOAAAA; expires=Sun, 13-Dec-2020 06:36:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Nov 2020 06:36:48 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/rbac/roleAssignments')
  .query(true)
  .reply(200, [{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-6ae2ff4b-4939-4952-a097-d234aad383a3","roleId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"6ae2ff4b-4939-4952-a097-d234aad383a3"},{"id":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1-23a9b13a-a58b-4d8e-a58a-ff4c351fae61","roleId":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","principalId":"23a9b13a-a58b-4d8e-a58a-ff4c351fae61"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-e64a6f06-c0ef-4564-ab5d-ac006d710db5","roleId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"e64a6f06-c0ef-4564-ab5d-ac006d710db5"},{"id":"roll_id-23a9b13a-a58b-4d8e-a58a-ff4c351fae61","roleId":"roll_id","principalId":"23a9b13a-a58b-4d8e-a58a-ff4c351fae61"},{"id":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1-principal_id","roleId":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","principalId":"principal_id"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-principal_id","roleId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"principal_id"},{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78-23a9b13a-a58b-4d8e-a58a-ff4c351fae61","roleId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"23a9b13a-a58b-4d8e-a58a-ff4c351fae61"},{"id":"roll_id-principal_id","roleId":"roll_id","principalId":"principal_id"}], [
  'Content-Length',
  '1473',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-continuation',
  '',
  'x-ms-request-id',
  '5cd43903-054d-4fd0-b174-1c87cbbd239e',
  'Date',
  'Fri, 13 Nov 2020 06:36:49 GMT'
]);

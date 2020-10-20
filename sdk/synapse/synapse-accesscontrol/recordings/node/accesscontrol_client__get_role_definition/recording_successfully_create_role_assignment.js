let nock = require('nock');

module.exports.hash = "74c3eb942d9ac08b641a2f1552870a8b";

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
  '80bc70d3-4c78-43c8-bdbc-eac4cb3d0600',
  'x-ms-ests-server',
  '2.1.11239.6 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Au8druuHi5tEv4mdMFHT1ZBJ0eYvAQAAAH0gQNcOAAAA; expires=Sun, 13-Dec-2020 06:36:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Nov 2020 06:36:46 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .post('/rbac/roleAssignments', {"roleId":"roll_id","principalId":"principal_id"})
  .query(true)
  .reply(200, {"id":"roll_id-principal_id","roleId":"roll_id","principalId":"principal_id"}, [
  'Content-Length',
  '183',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e2381d7a-67e0-4556-bd4c-1fbcdb0bcbbd',
  'Date',
  'Fri, 13 Nov 2020 06:36:47 GMT'
]);

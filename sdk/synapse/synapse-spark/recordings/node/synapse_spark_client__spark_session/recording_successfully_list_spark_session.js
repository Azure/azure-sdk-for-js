let nock = require('nock');

module.exports.hash = "b27eec2c875245499b9f341cbbd12635";

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
  '6b81de78-d6bc-4c78-816b-3701f1133f00',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhaFloxtOu9OgXj_APIn4ytJ0eYvAQAAALjGPdcOAAAA; expires=Fri, 11-Dec-2020 11:49:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 11 Nov 2020 11:49:12 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/livyApi/versions/2019-11-01-preview/sparkPools/sparkpool_name/sessions')
  .query(true)
  .reply(200, {"from":38,"total":0,"sessions":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-response-time-ms',
  '63',
  'x-ms-activity-id',
  'b90580c6-1a9a-4f7c-8a2f-699e061d1957',
  'x-ms-client-request-id',
  '897703be-00f4-4afb-b488-977a4b4d8afe',
  'x-ms-request-id',
  '4e2daf38-f1a2-4c19-ac9c-3326f8a358c9',
  'Date',
  'Wed, 11 Nov 2020 11:49:13 GMT'
]);

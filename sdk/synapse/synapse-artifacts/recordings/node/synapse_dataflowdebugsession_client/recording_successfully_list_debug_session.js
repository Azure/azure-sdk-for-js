let nock = require('nock');

module.exports.hash = "bd3d74d49cede2a679f33f056080e4c4";

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
  '5fcbd712-9340-431f-89bd-476ebd7d3100',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At1Z5umHbiRLgMnyxXSYIiBJ0eYvAQAAANQVO9cOAAAA; expires=Wed, 09-Dec-2020 10:49:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 09 Nov 2020 10:49:56 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .post('/queryDataFlowDebugSessions')
  .query(true)
  .reply(200, {"value":[{"startTime":"2020-11-09T10:00:38.570625+00:00","lastActivityTime":"2020-11-09T10:04:13.8804122+00:00","status":"Started","dataflowName":"DebugSession-510c2848-8980-4c07-b2bc-d1d6c748ffc3","sessionId":"510c2848-8980-4c07-b2bc-d1d6c748ffc3","coreCount":8,"nodeCount":0,"computeType":"General","timeToLiveInMinutes":60},{"startTime":"2020-11-09T10:46:34.4491102+00:00","lastActivityTime":"2020-11-09T10:49:51.7689285+00:00","status":"Started","dataflowName":"DebugSession-41a45f18-be39-43d8-be42-1b8e1961823a","sessionId":"41a45f18-be39-43d8-be42-1b8e1961823a","coreCount":8,"nodeCount":0,"computeType":"General","timeToLiveInMinutes":60}]}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '648',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'x-ms-correlation-request-id',
  '05f06b34-d6b0-4d63-80f5-32605ee2b3a5',
  'X-Content-Type-Options',
  'nosniff',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-request-id',
  '6192ee6c-6d9d-4b56-b459-546514e9e941',
  'Date',
  'Mon, 09 Nov 2020 10:49:58 GMT'
]);

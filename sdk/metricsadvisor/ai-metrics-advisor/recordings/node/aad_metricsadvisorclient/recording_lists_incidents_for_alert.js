let nock = require('nock');

module.exports.hash = "5cf5a7dda970561e436443e5fc772284";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  'a28c5b25-4ec8-4107-9789-ea0673953e00',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mDgAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:40:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:40:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"51d849d03277901eadfa9a0e7665b4ad-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"}},"property":{"incidentStatus":"Resolved"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"daceb039d9ec34d28f04654dd61aee57-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Karachi","category":"Handmade"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active"}}],"@nextLink":null}, [
  'Content-Length',
  '788',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '886d6ee1-36a0-429a-b130-5c2ba2c8adb3',
  'x-envoy-upstream-service-time',
  '305',
  'apim-request-id',
  '886d6ee1-36a0-429a-b130-5c2ba2c8adb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:40:26 GMT'
]);

let nock = require('nock');

module.exports.hash = "1ab6b0dcbc4f40c2cbcb9b39a05a30d3";

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
  'b30ebc5b-6645-4911-9756-be88608f4c00',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mDgAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:40:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:40:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .reply(200, {"value":[{"alertId":"175908d9800","timestamp":"2020-11-04T00:00:00Z","createdTime":"2020-11-05T00:56:55.458Z","modifiedTime":"2020-11-10T20:27:22.216Z"},{"alertId":"1758b673c00","timestamp":"2020-11-03T00:00:00Z","createdTime":"2020-11-04T00:06:13.262Z","modifiedTime":"2020-11-09T00:07:02.44Z"},{"alertId":"1758640e000","timestamp":"2020-11-02T00:00:00Z","createdTime":"2020-11-03T00:06:12.487Z","modifiedTime":"2020-11-08T00:06:42.859Z"},{"alertId":"175811a8400","timestamp":"2020-11-01T00:00:00Z","createdTime":"2020-11-02T00:33:16.23Z","modifiedTime":"2020-11-07T00:07:17.348Z"}],"@nextLink":null}, [
  'Content-Length',
  '602',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd10c7e5b-1583-42b1-accc-8fe8a7ebad37',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'd10c7e5b-1583-42b1-accc-8fe8a7ebad37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:40:24 GMT'
]);

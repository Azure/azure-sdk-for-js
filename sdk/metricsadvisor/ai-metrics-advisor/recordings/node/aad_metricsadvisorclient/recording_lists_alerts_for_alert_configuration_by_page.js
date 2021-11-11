let nock = require('nock');

module.exports.hash = "7de1290cc47ab0dc50a6f0fd71f5c833";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'dee07769-9593-4083-baea-2ce927feb400',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhLRLRgf_3pBjfrgrx9DVws; expires=Wed, 08-Dec-2021 09:38:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:03 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"17cd3a55400","timestamp":"2021-10-31T00:00:00Z","createdTime":"2021-11-01T00:16:11.817Z","modifiedTime":"2021-11-04T22:31:08.352Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '350',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c89a666e-235a-4716-ab01-30855d72bc7a',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'c89a666e-235a-4716-ab01-30855d72bc7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"17cce7ef800","timestamp":"2021-10-30T00:00:00Z","createdTime":"2021-10-31T00:16:45.619Z","modifiedTime":"2021-11-03T22:35:00.394Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '350',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5a608f38-386a-4a83-8b7b-87763119f433',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '5a608f38-386a-4a83-8b7b-87763119f433',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:04 GMT'
]);

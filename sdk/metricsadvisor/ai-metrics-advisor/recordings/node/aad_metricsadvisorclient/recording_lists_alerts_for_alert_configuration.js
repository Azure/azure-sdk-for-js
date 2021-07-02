let nock = require('nock');

module.exports.hash = "4a372b9c942a8fe19f599d8f3e225f91";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '03309eaf-7bbf-433f-a795-f399b3f1a300',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJP_5zXpMNFtNCcPwwYUd3GLH8mCQAAAMwkSdgOAAAA; expires=Fri, 02-Jul-2021 07:06:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 07:06:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .reply(200, {"value":[{"alertId":"175908d9800","timestamp":"2020-11-04T00:00:00Z","createdTime":"2020-11-05T00:56:55.458Z","modifiedTime":"2020-11-10T20:27:22.216Z"},{"alertId":"1758b673c00","timestamp":"2020-11-03T00:00:00Z","createdTime":"2020-11-04T00:06:13.262Z","modifiedTime":"2020-11-09T00:07:02.44Z"},{"alertId":"1758640e000","timestamp":"2020-11-02T00:00:00Z","createdTime":"2020-11-03T00:06:12.487Z","modifiedTime":"2020-11-08T00:06:42.859Z"},{"alertId":"175811a8400","timestamp":"2020-11-01T00:00:00Z","createdTime":"2020-11-02T00:33:16.23Z","modifiedTime":"2020-11-07T00:07:17.348Z"}]}, [
  'Content-Length',
  '585',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e43bbf3c-41a6-468c-820d-2debde8d7ee4',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'e43bbf3c-41a6-468c-820d-2debde8d7ee4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:06:04 GMT'
]);

let nock = require('nock');

module.exports.hash = "a341d378fba65433457a3944c6ec052c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '95a33dd3-1bf0-4407-b4b5-0590ec69ba00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApGffAYLGMdBtvSZDoptCxE; expires=Wed, 08-Dec-2021 09:38:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"__SUM__","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"High","anomalyStatus":"Active","value":55791561.8,"expectedValue":52146711.57082515}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '707',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '94b3ddb6-2dba-4b41-9bd1-dd2b23a5582b',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '94b3ddb6-2dba-4b41-9bd1-dd2b23a5582b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Seoul","category":"Office Products"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":17763.6,"expectedValue":14939.115446142221}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '693',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5d8a9f8f-17fe-4fc0-82e6-8388cb7a9edb',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '5d8a9f8f-17fe-4fc0-82e6-8388cb7a9edb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:04 GMT'
]);

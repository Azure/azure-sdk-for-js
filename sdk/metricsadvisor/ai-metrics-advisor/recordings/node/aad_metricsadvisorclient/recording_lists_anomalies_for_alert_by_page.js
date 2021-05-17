let nock = require('nock');

module.exports.hash = "df6208e51a2a70912e770c948c1f473d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '0ca1795e-d8e4-4b08-a94e-0ed77ef20700',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mDgAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":5079001.4,"expectedValue":5142673.035323909}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '702',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6ce56943-4654-429f-a6ba-22b457b9cad5',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '6ce56943-4654-429f-a6ba-22b457b9cad5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Karachi","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":3724747.4,"expectedValue":3579278.2792707016}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '686',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f40eedb6-8575-4092-8c10-466ff98dd696',
  'x-envoy-upstream-service-time',
  '347',
  'apim-request-id',
  'f40eedb6-8575-4092-8c10-466ff98dd696',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:02 GMT'
]);

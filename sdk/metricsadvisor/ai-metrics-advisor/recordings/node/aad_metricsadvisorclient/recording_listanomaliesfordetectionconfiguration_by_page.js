let nock = require('nock');

module.exports.hash = "30aa1c20df7a83e5962e7a8e0c310ffc";

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
  '191a7fb5-77e3-4555-8767-a30a43669b00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj_qCYJIIGVAjVrXSu3NRjw; expires=Wed, 08-Dec-2021 09:37:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:37:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Istanbul","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":0,"expectedValue":0.2226051564570372}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"__SUM__"},"property":{"anomalySeverity":"Medium","value":900770.6000000001,"expectedValue":1645160.8108448838}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '609',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '43204e46-0a6b-44f8-a4bb-15f429278ca4',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '43204e46-0a6b-44f8-a4bb-15f429278ca4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":8.2,"expectedValue":0.2799398290216903}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"__SUM__","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":12.6,"expectedValue":7.66378372884321}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '605',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8a43873c-ddd7-4526-86cf-7eb8599f7dc9',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '8a43873c-ddd7-4526-86cf-7eb8599f7dc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:00 GMT'
]);

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
  'ee81a464-a633-493b-947d-9328537a2f00',
  'x-ms-ests-server',
  '2.1.12231.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjM-XMi5GZlHjAXdBoADDpfGLH8mAQAAAEMgHdkOAAAA; expires=Fri, 10-Dec-2021 02:07:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:06:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":8.2,"expectedValue":0.11962657062232168}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Karachi","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Medium","value":3799.2,"expectedValue":299.10696511456587}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '610',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd2437820-b708-461b-8957-defa615b5d38',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'd2437820-b708-461b-8957-defa615b5d38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"New York","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":84.4,"expectedValue":6.073527005246529}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","value":756713.8,"expectedValue":821548.9344276552}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '616',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b8c8a0f9-0d7b-4323-805c-716f8f826a6d',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  'b8c8a0f9-0d7b-4323-805c-716f8f826a6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:00 GMT'
]);

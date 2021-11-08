let nock = require('nock');

module.exports.hash = "ae599a99002534f051931b059800049f";

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
  '201c79b6-a5d2-42b4-ab36-dbd6b5549000',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsQve2em55hFmjSMEPOMuxs; expires=Wed, 08-Dec-2021 09:38:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2021-08-05T00:00:00.000Z"})
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"Cairo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"__SUM__"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Office Products","region":"Seoul"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"__SUM__","region":"Miami"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Handmade","region":"Miami"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Home & Garden","region":"Miami"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Office Products","region":"Miami"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Electronics (Accessories)","region":"Istanbul"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"Seoul"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Home & Garden","region":"Tianjin"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Handmade","region":"Cairo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Electronics (Accessories)","region":"Cairo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Handmade","region":"__SUM__"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"Beijing"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Handmade","region":"Mumbai"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Grocery & Gourmet Food","region":"Cairo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"Karachi"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Handmade","region":"Seoul"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Shoes Handbags & Sunglasses","region":"Miami"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"__SUM__","region":"Tianjin"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$maxpagesize=20&$skip=20"}, [
  'Content-Length',
  '2487',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '94576a41-98c6-4d9a-a73e-de87c30aca50',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '94576a41-98c6-4d9a-a73e-de87c30aca50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:06 GMT'
]);

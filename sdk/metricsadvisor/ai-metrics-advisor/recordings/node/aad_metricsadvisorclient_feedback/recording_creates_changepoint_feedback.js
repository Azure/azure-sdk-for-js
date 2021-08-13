let nock = require('nock');

module.exports.hash = "9ab3076957683b48569a28e284963757";

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
  'eb10a13f-f2f2-4d80-91e7-c4238d76b200',
  'x-ms-ests-server',
  '2.1.11722.26 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvJP_5zXpMNFtNCcPwwYUd3GLH8mEQAAAMwkSdgOAAAA; expires=Fri, 02-Jul-2021 07:07:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 07:07:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/be48d74c-52a2-4b95-954b-6a421876a246',
  'x-request-id',
  '1c412860-801b-49e5-a935-0343cc80fa15',
  'x-envoy-upstream-service-time',
  '5288',
  'apim-request-id',
  '1c412860-801b-49e5-a935-0343cc80fa15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/be48d74c-52a2-4b95-954b-6a421876a246')
  .reply(200, {"feedbackId":"be48d74c-52a2-4b95-954b-6a421876a246","createdTime":"2021-06-02T07:07:16.318Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '415',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '28461db7-518e-44c0-b457-5be976c965d1',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '28461db7-518e-44c0-b457-5be976c965d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:16 GMT'
]);

let nock = require('nock');

module.exports.hash = "c7345fd7bf5f50e035c5b86364b1888b";

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
  '598dc972-ae29-4627-952f-6edca12c2100',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgLPDS1G1gVBlwMUANzoUwc; expires=Fri, 10-Dec-2021 02:07:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:16 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/daf3f9a2-494a-49ef-9bc7-7178e54fd967',
  'x-request-id',
  '49f627a3-9f8c-486a-9b2a-24bf055a0a52',
  'x-envoy-upstream-service-time',
  '409',
  'apim-request-id',
  '49f627a3-9f8c-486a-9b2a-24bf055a0a52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/daf3f9a2-494a-49ef-9bc7-7178e54fd967')
  .reply(200, {"feedbackId":"daf3f9a2-494a-49ef-9bc7-7178e54fd967","createdTime":"2021-11-10T02:07:17.108Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '417',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c962a703-bdaf-4e84-908e-5026def92a59',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'c962a703-bdaf-4e84-908e-5026def92a59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:17 GMT'
]);

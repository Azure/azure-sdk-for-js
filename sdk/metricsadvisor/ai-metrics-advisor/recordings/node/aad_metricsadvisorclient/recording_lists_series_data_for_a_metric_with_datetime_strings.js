let nock = require('nock');

module.exports.hash = "d10fd4412b97de0fff9fde503b4b36e7";

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
  '12d58ac1-6dbb-44d8-be80-a3e5ff49c400',
  'x-ms-ests-server',
  '2.1.11722.26 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJP_5zXpMNFtNCcPwwYUd3GLH8mEAAAAMwkSdgOAAAA; expires=Fri, 02-Jul-2021 07:06:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 07:06:45 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/data/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z","series":[{"city":"Cairo","category":"Home & Garden"},{"city":"Manila","category":"Shoes Handbags & Sunglasses"}]})
  .reply(200, {"value":[{"id":{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Cairo","category":"Home & Garden"}},"timestampList":["2020-08-05T00:00:00Z","2020-08-06T00:00:00Z","2020-08-07T00:00:00Z","2020-08-08T00:00:00Z","2020-08-09T00:00:00Z","2020-08-10T00:00:00Z","2020-08-11T00:00:00Z","2020-08-12T00:00:00Z","2020-08-13T00:00:00Z","2020-08-14T00:00:00Z","2020-08-15T00:00:00Z","2020-08-16T00:00:00Z","2020-08-17T00:00:00Z","2020-08-18T00:00:00Z","2020-08-19T00:00:00Z","2020-08-20T00:00:00Z","2020-08-21T00:00:00Z","2020-08-22T00:00:00Z","2020-08-23T00:00:00Z","2020-08-24T00:00:00Z","2020-08-25T00:00:00Z","2020-08-26T00:00:00Z","2020-08-27T00:00:00Z","2020-08-28T00:00:00Z","2020-08-29T00:00:00Z","2020-08-30T00:00:00Z","2020-08-31T00:00:00Z","2020-09-01T00:00:00Z","2020-09-02T00:00:00Z","2020-09-03T00:00:00Z","2020-09-04T00:00:00Z"],"valueList":[4694.2,4741.400000000001,4060.2000000000003,2324,2783.8,4648,4862.6,4685.2,4578.6,3682,2327.8,2983,4783.2,4997.6,5108,4773.2,3915.6000000000004,2638.4,3182,5056,5200.200000000001,5022.400000000001,5359.6,4518.2,2684.8,3235.6000000000004,4845.2,4821,5200,5068,4024.4]},{"id":{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Manila","category":"Shoes Handbags & Sunglasses"}},"timestampList":["2020-08-05T00:00:00Z","2020-08-06T00:00:00Z","2020-08-07T00:00:00Z","2020-08-08T00:00:00Z","2020-08-09T00:00:00Z","2020-08-10T00:00:00Z","2020-08-11T00:00:00Z","2020-08-12T00:00:00Z","2020-08-13T00:00:00Z","2020-08-14T00:00:00Z","2020-08-15T00:00:00Z","2020-08-16T00:00:00Z","2020-08-17T00:00:00Z","2020-08-18T00:00:00Z","2020-08-19T00:00:00Z","2020-08-20T00:00:00Z","2020-08-21T00:00:00Z","2020-08-22T00:00:00Z","2020-08-23T00:00:00Z","2020-08-24T00:00:00Z","2020-08-25T00:00:00Z","2020-08-26T00:00:00Z","2020-08-27T00:00:00Z","2020-08-28T00:00:00Z","2020-08-29T00:00:00Z","2020-08-30T00:00:00Z","2020-08-31T00:00:00Z","2020-09-01T00:00:00Z","2020-09-02T00:00:00Z","2020-09-03T00:00:00Z","2020-09-04T00:00:00Z"],"valueList":[6264455,6143905.2,4201741.2,3425373.8000000003,3656562,5064309.4,5237066.800000001,4631166.600000001,4382529.2,3578532.8000000003,3285258.6,5501434,6234598.2,6182013,6142358.600000001,6086747.800000001,4135463.4000000004,3398402.8000000003,5624620,6302798.2,6235636,6227662,6183055.800000001,4140718.6,3406581.2,5622781.4,6279117,6336467,6332000.800000001,6287129.2,4197455.8]}]}, [
  'Content-Length',
  '2426',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ccb15217-2d80-4b85-9a1f-362f094d513f',
  'x-envoy-upstream-service-time',
  '502',
  'apim-request-id',
  'ccb15217-2d80-4b85-9a1f-362f094d513f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:06:45 GMT'
]);

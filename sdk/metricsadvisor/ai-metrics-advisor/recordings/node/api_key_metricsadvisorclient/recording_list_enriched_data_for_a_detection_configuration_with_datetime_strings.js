let nock = require('nock');

module.exports.hash = "6e976b84297774454e44d8c0136ac95a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/series/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-08-27T00:00:00.000Z","series":[{"dimension":{"city":"Manila","category":"Shoes Handbags & Sunglasses"}},{"dimension":{"city":"Cairo","category":"Home & Garden"}}]})
  .reply(200, {"value":[{"series":{"dimension":{"city":"Manila","category":"Shoes Handbags & Sunglasses"}},"timestampList":["2020-08-01T00:00:00Z","2020-08-02T00:00:00Z","2020-08-03T00:00:00Z","2020-08-04T00:00:00Z","2020-08-05T00:00:00Z","2020-08-06T00:00:00Z","2020-08-07T00:00:00Z","2020-08-08T00:00:00Z","2020-08-09T00:00:00Z","2020-08-10T00:00:00Z","2020-08-11T00:00:00Z","2020-08-12T00:00:00Z","2020-08-13T00:00:00Z","2020-08-14T00:00:00Z","2020-08-15T00:00:00Z","2020-08-16T00:00:00Z","2020-08-17T00:00:00Z","2020-08-18T00:00:00Z","2020-08-19T00:00:00Z","2020-08-20T00:00:00Z","2020-08-21T00:00:00Z","2020-08-22T00:00:00Z","2020-08-23T00:00:00Z","2020-08-24T00:00:00Z","2020-08-25T00:00:00Z","2020-08-26T00:00:00Z"],"valueList":[3546568,5713162,6450863,6377158.2,6264455,6143905.2,4201741.2,3425373.8000000003,3656562,5064309.4,5237066.800000001,4631166.600000001,4382529.2,3578532.8000000003,3285258.6,5501434,6234598.2,6182013,6142358.600000001,6086747.800000001,4135463.4000000004,3398402.8000000003,5624620,6302798.2,6235636,6227662],"isAnomalyList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"periodList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"expectedValueList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"lowerBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"upperBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},{"series":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"timestampList":["2020-08-01T00:00:00Z","2020-08-02T00:00:00Z","2020-08-03T00:00:00Z","2020-08-04T00:00:00Z","2020-08-05T00:00:00Z","2020-08-06T00:00:00Z","2020-08-07T00:00:00Z","2020-08-08T00:00:00Z","2020-08-09T00:00:00Z","2020-08-10T00:00:00Z","2020-08-11T00:00:00Z","2020-08-12T00:00:00Z","2020-08-13T00:00:00Z","2020-08-14T00:00:00Z","2020-08-15T00:00:00Z","2020-08-16T00:00:00Z","2020-08-17T00:00:00Z","2020-08-18T00:00:00Z","2020-08-19T00:00:00Z","2020-08-20T00:00:00Z","2020-08-21T00:00:00Z","2020-08-22T00:00:00Z","2020-08-23T00:00:00Z","2020-08-24T00:00:00Z","2020-08-25T00:00:00Z","2020-08-26T00:00:00Z"],"valueList":[2155.8,2969.8,4654.6,4707.6,4694.2,4741.400000000001,4060.2000000000003,2324,2783.8,4648,4862.6,4685.2,4578.6,3682,2327.8,2983,4783.2,4997.6,5108,4773.2,3915.6000000000004,2638.4,3182,5056,5200.200000000001,5022.400000000001],"isAnomalyList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"periodList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"expectedValueList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"lowerBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"upperBoundaryList":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}]}, [
  'Content-Length',
  '3489',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3b3f0199-564c-4849-81f6-520f5d18c9f9',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '3b3f0199-564c-4849-81f6-520f5d18c9f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:59 GMT'
]);

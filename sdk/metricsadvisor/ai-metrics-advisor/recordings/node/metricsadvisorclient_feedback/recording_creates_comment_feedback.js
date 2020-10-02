let nock = require('nock');

module.exports.hash = "57bdcd8878055d78904d8bd8f0664496";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/22bffa61-98dc-4131-9d27-dea5ea3d16c0',
  'x-request-id',
  'a56c1315-c86f-4ce5-8b38-61d602841652',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  'a56c1315-c86f-4ce5-8b38-61d602841652',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:16 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/22bffa61-98dc-4131-9d27-dea5ea3d16c0')
  .reply(200, {"feedbackId":"22bffa61-98dc-4131-9d27-dea5ea3d16c0","createdTime":"2020-09-25T22:12:16.817Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '359',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '854304bb-7d3e-460c-b105-43298c139f5b',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '854304bb-7d3e-460c-b105-43298c139f5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:17 GMT',
  'Connection',
  'close'
]);

let nock = require('nock');

module.exports.hash = "4f9c6ff94013216897e009b6e95d20ea";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/22bffa61-98dc-4131-9d27-dea5ea3d16c0')
  .reply(200, {"feedbackId":"22bffa61-98dc-4131-9d27-dea5ea3d16c0","createdTime":"2020-09-25T22:12:16.817Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '359',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '266cd6a5-a448-45fb-a8bd-16253ca17c3c',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '266cd6a5-a448-45fb-a8bd-16253ca17c3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:17 GMT',
  'Connection',
  'close'
]);

let nock = require('nock');

module.exports.hash = "a8f499eec770cfb0ecbda9095b34bd28";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/263f9a33-7c75-4d00-bf96-7a3c23042a8a',
  'x-request-id',
  'ec29a663-8a4f-4f9b-abbe-bd459522634f',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  'ec29a663-8a4f-4f9b-abbe-bd459522634f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/263f9a33-7c75-4d00-bf96-7a3c23042a8a')
  .reply(200, {"feedbackId":"263f9a33-7c75-4d00-bf96-7a3c23042a8a","createdTime":"2021-06-02T07:08:02.911Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '11e7d606-eaee-4bcc-a0a3-08d70fe89037',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '11e7d606-eaee-4bcc-a0a3-08d70fe89037',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:03 GMT'
]);

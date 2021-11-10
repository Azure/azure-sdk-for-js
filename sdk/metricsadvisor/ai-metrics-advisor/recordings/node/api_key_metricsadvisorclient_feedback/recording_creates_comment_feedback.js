let nock = require('nock');

module.exports.hash = "6ff0d17bb67055a4ef5add7605c64970";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/2125e100-a17f-4b09-95fe-501a20eccd6f',
  'x-request-id',
  'd7574d40-979d-4ac8-b7fa-d6d9a508f5e3',
  'x-envoy-upstream-service-time',
  '344',
  'apim-request-id',
  'd7574d40-979d-4ac8-b7fa-d6d9a508f5e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/2125e100-a17f-4b09-95fe-501a20eccd6f')
  .reply(200, {"feedbackId":"2125e100-a17f-4b09-95fe-501a20eccd6f","createdTime":"2021-11-10T02:07:31.276Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e513a1a8-208a-498b-b7f9-566ca8245a43',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  'e513a1a8-208a-498b-b7f9-566ca8245a43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:31 GMT'
]);

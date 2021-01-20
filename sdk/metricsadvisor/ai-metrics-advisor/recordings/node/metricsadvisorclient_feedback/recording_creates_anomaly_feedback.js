let nock = require('nock');

module.exports.hash = "45defc3c330476699ffd2ac2dfc4fb8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/a6888385-475c-4873-a50d-ea190d2e773f',
  'x-request-id',
  'dd7b13bb-25e9-4614-8fa4-7bb977572896',
  'x-envoy-upstream-service-time',
  '342',
  'apim-request-id',
  'dd7b13bb-25e9-4614-8fa4-7bb977572896',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/a6888385-475c-4873-a50d-ea190d2e773f')
  .reply(200, {"feedbackId":"a6888385-475c-4873-a50d-ea190d2e773f","createdTime":"2020-11-13T22:02:56.238Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '475',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '10af19cc-52a3-43db-9627-7bd602170bf5',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '10af19cc-52a3-43db-9627-7bd602170bf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:56 GMT'
]);

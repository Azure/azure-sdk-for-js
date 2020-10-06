let nock = require('nock');

module.exports.hash = "cf664017339052411bdce9ace4d51a67";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"22bffa61-98dc-4131-9d27-dea5ea3d16c0","createdTime":"2020-09-25T22:12:16.817Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}},{"feedbackId":"80f0967f-fdf8-4fd5-99f2-765cb0776c05","createdTime":"2020-09-25T22:12:15.433Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=2"}, [
  'Content-Length',
  '836',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a4881cdb-71ed-427a-a9d6-e07192484ec8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'a4881cdb-71ed-427a-a9d6-e07192484ec8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:17 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"4c9cda9b-6bb3-4699-b5cb-65f9d7abe60e","createdTime":"2020-09-25T22:12:13.769Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T07:00:00Z","endTime":"2020-08-05T07:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"0e046b82-61f5-4330-a998-b69d2deadbf6","createdTime":"2020-09-25T22:12:06.936Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"feedbackType":"Anomaly","startTime":"2020-08-05T07:00:00Z","endTime":"2020-08-07T07:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=4"}, [
  'Content-Length',
  '1007',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5be555e9-7f8e-43de-8e6b-b9710bb5f42e',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '5be555e9-7f8e-43de-8e6b-b9710bb5f42e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:19 GMT',
  'Connection',
  'close'
]);

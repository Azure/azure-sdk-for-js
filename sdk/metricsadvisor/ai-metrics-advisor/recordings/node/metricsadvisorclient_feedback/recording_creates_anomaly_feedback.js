let nock = require('nock');

module.exports.hash = "616b445d2323b9bda2b7efebf171a133";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/0e046b82-61f5-4330-a998-b69d2deadbf6',
  'x-request-id',
  '42408ddc-045d-4f49-89f2-9b4a760747d9',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  '42408ddc-045d-4f49-89f2-9b4a760747d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:06 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/0e046b82-61f5-4330-a998-b69d2deadbf6')
  .reply(200, {"feedbackId":"0e046b82-61f5-4330-a998-b69d2deadbf6","createdTime":"2020-09-25T22:12:06.936Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '466',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '24b50d7c-372d-4300-92a4-2e0b39ff0cb9',
  'x-envoy-upstream-service-time',
  '5153',
  'apim-request-id',
  '24b50d7c-372d-4300-92a4-2e0b39ff0cb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:12 GMT',
  'Connection',
  'close'
]);

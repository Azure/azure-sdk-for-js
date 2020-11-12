let nock = require('nock');

module.exports.hash = "fbe408abf4e1edb48435ae7794f50f49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Karachi","__SUM__"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/anomalies/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2fdc41c9-7dcc-4412-b2a3-08d75270614f',
  'x-envoy-upstream-service-time',
  '374',
  'apim-request-id',
  '2fdc41c9-7dcc-4412-b2a3-08d75270614f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Los Angeles","Delhi"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/anomalies/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '07ba99ce-8584-40f3-af82-87b4235c9714',
  'x-envoy-upstream-service-time',
  '310',
  'apim-request-id',
  '07ba99ce-8584-40f3-af82-87b4235c9714',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:40 GMT'
]);

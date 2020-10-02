let nock = require('nock');

module.exports.hash = "a2e2a6fe6ee87099c671fd674d20b00b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z","dimensionName":"Dim1"})
  .query(true)
  .reply(200, {"value":["Cherry Laurel","Cabbage Palm"],"@nextLink":"https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '259',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '06f9c2a5-94a8-421d-aae4-38e0f425bbdc',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '06f9c2a5-94a8-421d-aae4-38e0f425bbdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:17 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z","dimensionName":"Dim1"})
  .query(true)
  .reply(200, {"value":["Common Lime","Blackthorn"],"@nextLink":"https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '35566776-dcb4-4300-a483-d3da9197d997',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '35566776-dcb4-4300-a483-d3da9197d997',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:17 GMT',
  'Connection',
  'close'
]);

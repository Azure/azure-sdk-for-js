let nock = require('nock');

module.exports.hash = "294c9dcee41293dc109a510533229d0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"00917e01b8bc5145a2ae207a8029fd11-1745669ac00","startTime":"2020-09-04T00:00:00Z","lastTime":"2020-09-04T00:00:00Z","rootNode":{"dimension":{"Dim1":"Cherry","Dim2":"Ape"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}},{"incidentId":"0899b6d37863f294ffaab15dc887f720-1745669ac00","startTime":"2020-09-04T00:00:00Z","lastTime":"2020-09-04T00:00:00Z","rootNode":{"dimension":{"Dim1":"Common Lime","Dim2":"Butterfly"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$top=2&$token=eyJtZXRyaWNJZCI6IjNkNDhlZDNlLTZlNmUtNDM5MS1iNzhmLWIwMGRmZWUxZTZmNSIsImRldGVjdENvbmZpZ0lkIjoiYzBmMjUzOWYtYjgwNC00YWI5LWE3MGYtMGRhMGM4OWM3NmQ4Iiwic3RhcnRUaW1lIjoiMjAyMC0wOC0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMC0wOS0wNVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1DMHdPUzB3TlZRd01Eb3dNRG93TUZvakl5TXdPRGs1WWpaa016YzROak5tTWprMFptWmhZV0l4TldSak9EZzNaamN5TUE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1101',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '56404406-1512-4673-9c00-cc63c7f776e9',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '56404406-1512-4673-9c00-cc63c7f776e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:14 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"1e18994824d880a47de4f87cde3018c4-1745669ac00","startTime":"2020-09-04T00:00:00Z","lastTime":"2020-09-04T00:00:00Z","rootNode":{"dimension":{"Dim1":"Common Ash","Dim2":"Anaconda"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}},{"incidentId":"267f0c5ad4c1b049d6fd59a784d6c01d-1745669ac00","startTime":"2020-09-03T00:00:00Z","lastTime":"2020-09-04T00:00:00Z","rootNode":{"dimension":{"Dim1":"Bastard Service Tree","Dim2":"Arctic Wolf"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$top=2&$token=eyJtZXRyaWNJZCI6IjNkNDhlZDNlLTZlNmUtNDM5MS1iNzhmLWIwMGRmZWUxZTZmNSIsImRldGVjdENvbmZpZ0lkIjoiYzBmMjUzOWYtYjgwNC00YWI5LWE3MGYtMGRhMGM4OWM3NmQ4Iiwic3RhcnRUaW1lIjoiMjAyMC0wOC0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMC0wOS0wNVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1DMHdPUzB3TlZRd01Eb3dNRG93TUZvakl5TXlOamRtTUdNMVlXUTBZekZpTURRNVpEWm1aRFU1WVRjNE5HUTJZekF4WkE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1121',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c4ecae19-7ff9-4f7f-9c0e-f89c0a64901c',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  'c4ecae19-7ff9-4f7f-9c0e-f89c0a64901c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:15 GMT',
  'Connection',
  'close'
]);

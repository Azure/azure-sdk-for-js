let nock = require('nock');

module.exports.hash = "ad571fe06ccea51458a22486b720e15a";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1161257785259006866","multiEventId2":"multiEventId2161257785259003349"},"newDate":{"multiEventDate1":"2021-02-06T02:17:32.590Z","multiEventDate2":"2021-02-06T02:17:32.590Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1161257785259006866","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-02-06T02:17:32.590Z","dataVersion":"1.0"},{"id":"multiEventId2161257785259003349","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-02-06T02:17:32.590Z","dataVersion":"1.0"}])
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'api-supported-versions',
  '2018-01-01',
  'x-ms-request-id',
  '2d51c28d-48e0-499d-ac7d-54f569537f73',
  'Date',
  'Sat, 06 Feb 2021 02:17:32 GMT'
]);

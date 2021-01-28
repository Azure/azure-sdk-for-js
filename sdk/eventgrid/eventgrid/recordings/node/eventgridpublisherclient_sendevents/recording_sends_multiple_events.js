let nock = require('nock');

module.exports.hash = "fdc26a5ca6514dd6a88d88a54394469a";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1161168561017305186","multiEventId2":"multiEventId2161168561017304614"},"newDate":{"multiEventDate1":"2021-01-26T18:26:50.173Z","multiEventDate2":"2021-01-26T18:26:50.173Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1161168561017305186","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-01-26T18:26:50.173Z","dataVersion":"1.0"},{"id":"multiEventId2161168561017304614","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-01-26T18:26:50.173Z","dataVersion":"1.0"}])
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
  '50d8a8ab-5c25-464d-b244-48eaa0115199',
  'Date',
  'Tue, 26 Jan 2021 18:26:50 GMT'
]);

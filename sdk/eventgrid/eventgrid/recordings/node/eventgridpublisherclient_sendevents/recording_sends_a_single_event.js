let nock = require('nock');

module.exports.hash = "d3836591952c853e63413c6baee86b80";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId161168560981909647"},"newDate":{"singleEventDate":"2021-01-26T18:26:49.819Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId161168560981909647","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-01-26T18:26:49.819Z","dataVersion":"1.0"}])
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
  'e0334842-8c3c-4fe1-bc7d-6a97ae11ccb1',
  'Date',
  'Tue, 26 Jan 2021 18:26:50 GMT'
]);

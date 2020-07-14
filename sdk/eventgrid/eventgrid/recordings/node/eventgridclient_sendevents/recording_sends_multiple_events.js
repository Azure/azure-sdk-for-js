let nock = require('nock');

module.exports.hash = "b8c32c266a21a9129c07d237cc8e3d2b";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1159477576164006772","multiEventId2":"multiEventId2159477576164007351"},"newDate":{"multiEventDate1":"2020-07-15T01:16:01.640Z","multiEventDate2":"2020-07-15T01:16:01.640Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1159477576164006772","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-15T01:16:01.640Z","dataVersion":"1.0"},{"id":"multiEventId2159477576164007351","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-15T01:16:01.640Z","dataVersion":"1.0"}])
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
  '8dbf7cf8-b65d-4d88-bc45-05cab784986b',
  'Date',
  'Wed, 15 Jul 2020 01:16:02 GMT'
]);

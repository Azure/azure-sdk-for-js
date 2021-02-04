let nock = require('nock');

module.exports.hash = "f54a8b7d13e4ae34fadeb0393c88eaf4";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId161168561021500558"},"newDate":{"cloudSingleEventDate":"2021-01-26T18:26:50.215Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId161168561021500558","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-01-26T18:26:50.215Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  'd5f15325-e97d-4a27-ab57-531dd130301b',
  'Date',
  'Tue, 26 Jan 2021 18:26:51 GMT'
]);

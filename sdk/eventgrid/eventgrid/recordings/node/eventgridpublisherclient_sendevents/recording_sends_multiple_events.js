let nock = require('nock');

module.exports.hash = "b8c32c266a21a9129c07d237cc8e3d2b";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1159588373643900701","multiEventId2":"multiEventId2159588373643900216"},"newDate":{"multiEventDate1":"2020-07-27T21:02:16.439Z","multiEventDate2":"2020-07-27T21:02:16.439Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1159588373643900701","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-27T21:02:16.439Z","dataVersion":"1.0"},{"id":"multiEventId2159588373643900216","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-27T21:02:16.439Z","dataVersion":"1.0"}])
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
  '2ea7f5e7-f8cf-4051-8b39-353aaa531c12',
  'Date',
  'Mon, 27 Jul 2020 21:02:16 GMT'
]);

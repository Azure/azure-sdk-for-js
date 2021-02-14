let nock = require('nock');

module.exports.hash = "b8c32c266a21a9129c07d237cc8e3d2b";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1160161957303904323","multiEventId2":"multiEventId2160161957303900629"},"newDate":{"multiEventDate1":"2020-10-02T06:19:33.039Z","multiEventDate2":"2020-10-02T06:19:33.039Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1160161957303904323","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-10-02T06:19:33.039Z","dataVersion":"1.0"},{"id":"multiEventId2160161957303900629","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-10-02T06:19:33.039Z","dataVersion":"1.0"}])
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
  'dfdb4176-a8de-4aa4-a900-c5b21303284f',
  'Date',
  'Fri, 02 Oct 2020 06:19:34 GMT'
]);

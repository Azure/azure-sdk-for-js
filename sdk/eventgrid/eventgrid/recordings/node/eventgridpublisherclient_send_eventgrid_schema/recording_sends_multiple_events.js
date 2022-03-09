let nock = require('nock');

module.exports.hash = "ad571fe06ccea51458a22486b720e15a";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1161541017700703368","multiEventId2":"multiEventId2161541017700701734"},"newDate":{"multiEventDate1":"2021-03-10T21:02:57.007Z","multiEventDate2":"2021-03-10T21:02:57.007Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1161541017700703368","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-03-10T21:02:57.007Z","dataVersion":"1.0"},{"id":"multiEventId2161541017700701734","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-03-10T21:02:57.007Z","dataVersion":"1.0"}])
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
  '6e7cb7f6-a74a-4809-b0e2-cb901b04054e',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);

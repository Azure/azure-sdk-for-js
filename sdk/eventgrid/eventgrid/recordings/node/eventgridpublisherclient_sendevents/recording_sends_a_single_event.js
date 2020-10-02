let nock = require('nock');

module.exports.hash = "93ae44857b9e0329bc4ac9a07e444214";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId160161957273508409"},"newDate":{"singleEventDate":"2020-10-02T06:19:32.735Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId160161957273508409","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-10-02T06:19:32.735Z","dataVersion":"1.0"}])
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
  'd713b5c5-e878-4527-91f4-a4264f98124d',
  'Date',
  'Fri, 02 Oct 2020 06:19:33 GMT'
]);

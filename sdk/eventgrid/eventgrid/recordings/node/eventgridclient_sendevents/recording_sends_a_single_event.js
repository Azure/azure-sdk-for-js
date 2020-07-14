let nock = require('nock');

module.exports.hash = "93ae44857b9e0329bc4ac9a07e444214";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId159477576134002891"},"newDate":{"singleEventDate":"2020-07-15T01:16:01.340Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId159477576134002891","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-15T01:16:01.340Z","dataVersion":"1.0"}])
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
  'b422b307-f041-46ef-a5d2-02ca35ab02be',
  'Date',
  'Wed, 15 Jul 2020 01:16:02 GMT'
]);

let nock = require('nock');

module.exports.hash = "93ae44857b9e0329bc4ac9a07e444214";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId159588373611301458"},"newDate":{"singleEventDate":"2020-07-27T21:02:16.113Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId159588373611301458","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-27T21:02:16.113Z","dataVersion":"1.0"}])
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
  'ef70f7ba-868c-4cee-8c9b-e27e2c01409b',
  'Date',
  'Mon, 27 Jul 2020 21:02:16 GMT'
]);

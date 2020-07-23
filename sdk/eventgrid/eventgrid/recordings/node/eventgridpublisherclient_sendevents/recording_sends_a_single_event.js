let nock = require('nock');

module.exports.hash = "93ae44857b9e0329bc4ac9a07e444214";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId159545157109200706"},"newDate":{"singleEventDate":"2020-07-22T20:59:31.092Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId159545157109200706","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-22T20:59:31.092Z","dataVersion":"1.0"}])
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
  '2a44e61e-4e08-4138-a58e-4fc9f08e3fb0',
  'Date',
  'Wed, 22 Jul 2020 20:59:31 GMT'
]);

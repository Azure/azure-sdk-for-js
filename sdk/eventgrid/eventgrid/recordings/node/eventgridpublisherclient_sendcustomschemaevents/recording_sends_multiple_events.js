let nock = require('nock');

module.exports.hash = "f4fce400dc651a8acd221ee29b4512ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"ver":"1.0","typ":"Azure.Sdk.TestEvent1","sub":"Multiple 1","payload":{"hello":"world"}},{"ver":"1.0","typ":"Azure.Sdk.TestEvent1","sub":"Multiple 2","payload":{"hello":"world"}}])
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
  '43d477f7-32cd-4b33-8d4d-d0a9b85139d7',
  'Date',
  'Tue, 26 Jan 2021 18:26:51 GMT'
]);

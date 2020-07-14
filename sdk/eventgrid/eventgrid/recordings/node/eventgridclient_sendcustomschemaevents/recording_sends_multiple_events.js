let nock = require('nock');

module.exports.hash = "d76e8a9024ff01c8e6c19fad4188cddb";

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
  'bf74ae91-2aa5-4373-8c4b-7dc77dcc6617',
  'Date',
  'Wed, 15 Jul 2020 01:16:03 GMT'
]);

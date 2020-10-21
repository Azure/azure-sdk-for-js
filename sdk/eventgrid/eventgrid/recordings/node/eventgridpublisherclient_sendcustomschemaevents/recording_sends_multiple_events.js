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
  'a541a967-991c-4d1f-9bc5-59b318703d1c',
  'Date',
  'Fri, 02 Oct 2020 06:19:34 GMT'
]);

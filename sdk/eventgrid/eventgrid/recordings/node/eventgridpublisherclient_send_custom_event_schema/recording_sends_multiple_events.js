let nock = require('nock');

module.exports.hash = "5737d9510585b0f121c55d53885b8065";

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
  '47d57b4f-7f51-47c4-9c89-e21bb4ac9c13',
  'Date',
  'Sat, 06 Feb 2021 02:17:32 GMT'
]);

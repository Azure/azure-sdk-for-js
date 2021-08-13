let nock = require('nock');

module.exports.hash = "de073b9387d2406ec308746cbd8ac2a9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"ver":"1.0","typ":"Azure.Sdk.TestEvent1","sub":"Single","payload":{"hello":"world"}}])
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
  'aa603844-0c2f-4ff8-a1e9-5d1fbedd7313',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);

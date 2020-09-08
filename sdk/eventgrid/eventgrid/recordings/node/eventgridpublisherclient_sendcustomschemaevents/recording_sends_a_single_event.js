let nock = require('nock');

module.exports.hash = "3243d9d0032a64c42cdeaf331c65085e";

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
  'fbdc8574-3c20-4bc9-af6b-0d5e454611f6',
  'Date',
  'Mon, 27 Jul 2020 21:02:16 GMT'
]);

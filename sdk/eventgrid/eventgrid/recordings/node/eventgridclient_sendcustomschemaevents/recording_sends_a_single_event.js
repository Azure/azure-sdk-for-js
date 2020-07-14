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
  '1c2dc6b2-5466-49e4-be00-1238811fe55c',
  'Date',
  'Wed, 15 Jul 2020 01:16:02 GMT'
]);

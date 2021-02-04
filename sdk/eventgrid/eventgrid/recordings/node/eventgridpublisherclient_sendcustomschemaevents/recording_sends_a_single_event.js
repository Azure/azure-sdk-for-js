let nock = require('nock');

module.exports.hash = "6a0323357c112a7fee98ad57d952016e";

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
  '9cfbebf2-66c8-48c0-b9b5-deecf52b8dbc',
  'Date',
  'Tue, 26 Jan 2021 18:26:51 GMT'
]);

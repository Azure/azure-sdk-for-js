let nock = require('nock');

module.exports.hash = "79c11782e3933cddd2d23967ce582347";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId161257785260900910"},"newDate":{"cloudSingleEventDate":"2021-02-06T02:17:32.609Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId161257785260900910","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-02-06T02:17:32.609Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  '233dfcef-b8c8-4200-aed7-b3e62e05ce18',
  'Date',
  'Sat, 06 Feb 2021 02:17:32 GMT'
]);

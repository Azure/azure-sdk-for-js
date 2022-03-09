let nock = require('nock');

module.exports.hash = "79c11782e3933cddd2d23967ce582347";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId161541017711901749"},"newDate":{"cloudSingleEventDate":"2021-03-10T21:02:57.119Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId161541017711901749","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-03-10T21:02:57.119Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  'df099dbb-a29d-47e5-8e1f-e3f0b8fb7730',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);

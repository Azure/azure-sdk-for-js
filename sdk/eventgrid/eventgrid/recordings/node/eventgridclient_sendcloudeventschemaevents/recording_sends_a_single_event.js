let nock = require('nock');

module.exports.hash = "b15b1edb6fd215ff27f66c70053afbb8";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId159477576171608507"},"newDate":{"cloudSingleEventDate":"2020-07-15T01:16:01.716Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId159477576171608507","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-07-15T01:16:01.716Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  '76b94efe-2678-47c5-9874-5bce255ef496',
  'Date',
  'Wed, 15 Jul 2020 01:16:02 GMT'
]);

let nock = require('nock');

module.exports.hash = "b15b1edb6fd215ff27f66c70053afbb8";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId159588373652209687"},"newDate":{"cloudSingleEventDate":"2020-07-27T21:02:16.522Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId159588373652209687","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-07-27T21:02:16.522Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  '05f88f8f-bd50-41d7-b56c-394c1eeebe1f',
  'Date',
  'Mon, 27 Jul 2020 21:02:16 GMT'
]);

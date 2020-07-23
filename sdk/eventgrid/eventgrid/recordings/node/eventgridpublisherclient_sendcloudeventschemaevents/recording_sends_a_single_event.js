let nock = require('nock');

module.exports.hash = "b15b1edb6fd215ff27f66c70053afbb8";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId159545157148202250"},"newDate":{"cloudSingleEventDate":"2020-07-22T20:59:31.482Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId159545157148202250","source":"/earth/unitedstates/washington/kirkland/finnhill","type":"Azure.Sdk.TestEvent1","time":"2020-07-22T20:59:31.482Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  '304512a3-c189-4094-8e12-55d8727d1f80',
  'Date',
  'Wed, 22 Jul 2020 20:59:32 GMT'
]);

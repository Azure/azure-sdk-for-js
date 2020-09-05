let nock = require('nock');

module.exports.hash = "cefc29910fbb6c53981faf8430a3521b";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1159588373674007628","cloudMultiEventId2":"cloudMultiEventId2159588373674005416"},"newDate":{"cloudMultiEventDate1":"2020-07-27T21:02:16.740Z","cloudMultiEventDate2":"2020-07-27T21:02:16.740Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1159588373674007628","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-07-27T21:02:16.740Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2159588373674005416","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-07-27T21:02:16.740Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  '9ff2a9d4-8089-4ac2-9c2d-1d184abf00e5',
  'Date',
  'Mon, 27 Jul 2020 21:02:16 GMT'
]);

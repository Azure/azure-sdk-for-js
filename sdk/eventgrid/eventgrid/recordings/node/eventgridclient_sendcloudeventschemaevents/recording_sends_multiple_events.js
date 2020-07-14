let nock = require('nock');

module.exports.hash = "cefc29910fbb6c53981faf8430a3521b";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1159477576192000975","cloudMultiEventId2":"cloudMultiEventId2159477576192004669"},"newDate":{"cloudMultiEventDate1":"2020-07-15T01:16:01.920Z","cloudMultiEventDate2":"2020-07-15T01:16:01.920Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1159477576192000975","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-07-15T01:16:01.920Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2159477576192004669","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-07-15T01:16:01.920Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  '5a7beed2-2df1-4d8b-887a-267d7c638fa3',
  'Date',
  'Wed, 15 Jul 2020 01:16:02 GMT'
]);

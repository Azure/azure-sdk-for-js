let nock = require('nock');

module.exports.hash = "cefc29910fbb6c53981faf8430a3521b";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1159545157162605520","cloudMultiEventId2":"cloudMultiEventId2159545157162709419"},"newDate":{"cloudMultiEventDate1":"2020-07-22T20:59:31.627Z","cloudMultiEventDate2":"2020-07-22T20:59:31.627Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1159545157162605520","source":"/earth/unitedstates/washington/kirkland/finnhill","type":"Azure.Sdk.TestEvent1","time":"2020-07-22T20:59:31.627Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2159545157162709419","source":"/earth/unitedstates/washington/kirkland/finnhill","type":"Azure.Sdk.TestEvent1","time":"2020-07-22T20:59:31.627Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  '5615af32-6bb1-46f4-baa9-ab4034a4b6ae',
  'Date',
  'Wed, 22 Jul 2020 20:59:32 GMT'
]);

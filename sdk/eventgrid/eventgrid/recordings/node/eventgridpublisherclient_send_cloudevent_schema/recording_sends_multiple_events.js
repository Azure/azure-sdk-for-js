let nock = require('nock');

module.exports.hash = "270107bc3f163d9770cce18126db6e06";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1161257785274707186","cloudMultiEventId2":"cloudMultiEventId2161257785274703951"},"newDate":{"cloudMultiEventDate1":"2021-02-06T02:17:32.747Z","cloudMultiEventDate2":"2021-02-06T02:17:32.747Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1161257785274707186","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-02-06T02:17:32.747Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2161257785274703951","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-02-06T02:17:32.747Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  '4434f3a2-1c00-420c-bb19-05610c23d0b3',
  'Date',
  'Sat, 06 Feb 2021 02:17:32 GMT'
]);

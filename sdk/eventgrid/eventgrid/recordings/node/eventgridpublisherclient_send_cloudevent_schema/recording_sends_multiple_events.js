let nock = require('nock');

module.exports.hash = "270107bc3f163d9770cce18126db6e06";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1161541017721004340","cloudMultiEventId2":"cloudMultiEventId2161541017721002759"},"newDate":{"cloudMultiEventDate1":"2021-03-10T21:02:57.210Z","cloudMultiEventDate2":"2021-03-10T21:02:57.210Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1161541017721004340","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-03-10T21:02:57.210Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2161541017721002759","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-03-10T21:02:57.210Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  '606b2375-30ee-43ad-93da-87194bfd387c',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);

let nock = require('nock');

module.exports.hash = "f6fe3d52d717fd3630ba906ade952f7b";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1161168561047203144","cloudMultiEventId2":"cloudMultiEventId2161168561047204678"},"newDate":{"cloudMultiEventDate1":"2021-01-26T18:26:50.472Z","cloudMultiEventDate2":"2021-01-26T18:26:50.472Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1161168561047203144","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-01-26T18:26:50.472Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2161168561047204678","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-01-26T18:26:50.472Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  'fae08b75-3f7b-4cff-86f5-d77b1ffe4763',
  'Date',
  'Tue, 26 Jan 2021 18:26:51 GMT'
]);

let nock = require('nock');

module.exports.hash = "cefc29910fbb6c53981faf8430a3521b";

module.exports.testInfo = {"uniqueName":{"cloudMultiEventId1":"cloudMultiEventId1160161957330706944","cloudMultiEventId2":"cloudMultiEventId2160161957330706023"},"newDate":{"cloudMultiEventDate1":"2020-10-02T06:19:33.307Z","cloudMultiEventDate2":"2020-10-02T06:19:33.307Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudMultiEventId1160161957330706944","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-10-02T06:19:33.307Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 1"},{"id":"cloudMultiEventId2160161957330706023","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-10-02T06:19:33.307Z","specversion":"1.0","datacontenttype":"application/json","subject":"Multiple 2"}])
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
  'ce2dbd99-384b-450a-9644-23508bdcbfc0',
  'Date',
  'Fri, 02 Oct 2020 06:19:34 GMT'
]);

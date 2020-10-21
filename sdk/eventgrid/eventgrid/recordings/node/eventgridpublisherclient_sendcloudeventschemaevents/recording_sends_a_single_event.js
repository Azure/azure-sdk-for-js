let nock = require('nock');

module.exports.hash = "b15b1edb6fd215ff27f66c70053afbb8";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId160161957312109296"},"newDate":{"cloudSingleEventDate":"2020-10-02T06:19:33.121Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudSingleEventId160161957312109296","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-10-02T06:19:33.121Z","specversion":"1.0","datacontenttype":"application/json"}])
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
  '8cb4c799-b937-4ebf-b2c5-5803f9af5f30',
  'Date',
  'Fri, 02 Oct 2020 06:19:33 GMT'
]);

let nock = require('nock');

module.exports.hash = "357bb46a327afd892edc5a89b1d5c4c3";

module.exports.testInfo = {"uniqueName":{"cloudTracingEventId":"cloudTracingEventId161168561052005009"},"newDate":{"cloudTracingEventDate":"2021-01-26T18:26:50.520Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudTracingEventId161168561052005009","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-01-26T18:26:50.520Z","specversion":"1.0","datacontenttype":"application/json","subject":"Single with Trace Parent","traceparent":"00-1-3-00"}])
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
  'cd6b4b67-a45b-4f2e-9864-a4e5c29d0172',
  'Date',
  'Tue, 26 Jan 2021 18:26:51 GMT'
]);

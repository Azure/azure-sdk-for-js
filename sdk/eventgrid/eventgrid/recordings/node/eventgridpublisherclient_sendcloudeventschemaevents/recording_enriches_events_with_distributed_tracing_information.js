let nock = require('nock');

module.exports.hash = "e2a76a5d9d938e00781cf1196fef789c";

module.exports.testInfo = {"uniqueName":{"cloudTracingEventId":"cloudTracingEventId160161957338401351"},"newDate":{"cloudTracingEventDate":"2020-10-02T06:19:33.384Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudTracingEventId160161957338401351","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2020-10-02T06:19:33.384Z","specversion":"1.0","datacontenttype":"application/json","subject":"Single with Trace Parent","traceparent":"00-1-3-00"}])
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
  '53541e19-8134-404e-b98f-5606335f3849',
  'Date',
  'Fri, 02 Oct 2020 06:19:34 GMT'
]);

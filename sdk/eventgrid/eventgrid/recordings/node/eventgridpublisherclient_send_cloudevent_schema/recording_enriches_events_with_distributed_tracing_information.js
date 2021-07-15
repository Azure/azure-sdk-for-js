let nock = require('nock');

module.exports.hash = "646c836f51adf53e50b18e93588af60e";

module.exports.testInfo = {"uniqueName":{"cloudTracingEventId":"cloudTracingEventId161541017722805439"},"newDate":{"cloudTracingEventDate":"2021-03-10T21:02:57.228Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudTracingEventId161541017722805439","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-03-10T21:02:57.228Z","specversion":"1.0","datacontenttype":"application/json","subject":"Single with Trace Parent","traceparent":"00-1-3-00"}])
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
  '1eaf88ec-b2e2-4d7a-8637-93a3319a79b5',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);

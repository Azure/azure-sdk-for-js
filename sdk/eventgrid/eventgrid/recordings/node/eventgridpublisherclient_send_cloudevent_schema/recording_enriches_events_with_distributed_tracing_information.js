let nock = require('nock');

module.exports.hash = "646c836f51adf53e50b18e93588af60e";

module.exports.testInfo = {"uniqueName":{"cloudTracingEventId":"cloudTracingEventId161257785276403674"},"newDate":{"cloudTracingEventDate":"2021-02-06T02:17:32.764Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"cloudTracingEventId161257785276403674","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-02-06T02:17:32.764Z","specversion":"1.0","datacontenttype":"application/json","subject":"Single with Trace Parent","traceparent":"00-1-3-00"}])
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
  '6adfc374-ded1-46aa-bef9-ba1d8ae660de',
  'Date',
  'Sat, 06 Feb 2021 02:17:32 GMT'
]);

let nock = require('nock');

module.exports.hash = "64a276f1f34993ad88cd6f44427e5277";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId161257785249607296"},"newDate":{"singleEventDate":"2021-02-06T02:17:32.496Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId161257785249607296","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-02-06T02:17:32.496Z","dataVersion":"1.0"}])
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
  'ba6086a7-6b1d-43c4-ab0a-aeb2f4e95eb4',
  'Date',
  'Sat, 06 Feb 2021 02:17:32 GMT'
]);

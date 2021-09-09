let nock = require('nock');

module.exports.hash = "64a276f1f34993ad88cd6f44427e5277";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId161541017678808254"},"newDate":{"singleEventDate":"2021-03-10T21:02:56.788Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"singleEventId161541017678808254","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-03-10T21:02:56.788Z","dataVersion":"1.0"}])
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
  '17b7267f-f3e5-40de-b5eb-9c164da9685b',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);

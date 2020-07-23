let nock = require('nock');

module.exports.hash = "b8c32c266a21a9129c07d237cc8e3d2b";

module.exports.testInfo = {"uniqueName":{"multiEventId1":"multiEventId1159545157139309466","multiEventId2":"multiEventId2159545157139401284"},"newDate":{"multiEventDate1":"2020-07-22T20:59:31.393Z","multiEventDate2":"2020-07-22T20:59:31.394Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/api/events', [{"id":"multiEventId1159545157139309466","subject":"Multiple 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-22T20:59:31.393Z","dataVersion":"1.0"},{"id":"multiEventId2159545157139401284","subject":"Multiple 2","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2020-07-22T20:59:31.394Z","dataVersion":"1.0"}])
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
  'b255ebc9-6ad6-48b7-8665-aaa1e6e9d628',
  'Date',
  'Wed, 22 Jul 2020 20:59:31 GMT'
]);

let nock = require('nock');

module.exports.hash = "c712c9c77d67bd041a87c0cfd72c611f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(false)
  .reply(202, {"capabilitiesUpdateId":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Operation-Location,Location,operation-id,capabilities-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'I99VikQapUCozl5S/WyOtw.0',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1785ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0A8zMYAAAAAB3ggB+vQgHTpdUTovnM/l3WVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T16:38:28.5782722+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'jqhrRy/v5ECHH4kHTR89aw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '391ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BMzMYAAAAACnEkLQqM1SQ4u8ASmgNGrbWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T16:38:28.5782722+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'nq3C7t8F+UOL/4yGWj8NIg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '298ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0B8zMYAAAAACJyLQn5ajbS7RH4GQNWKltWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T16:38:28.5782722+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'jXXTRhZlrUCMOdmQpWppFg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '304ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CczMYAAAAAB3VvNfPGagSoG0bGVhlzeZWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T16:38:28.5782722+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'gfq27MjhO06jUEOjSLl5PQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '297ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DMzMYAAAAACWu1aerjVCRYGLexL5MS8SWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T16:38:28.5782722+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ibRBzJvoFky4Uh8URmmGEg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '294ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DszMYAAAAACwoYCPkDb5SaTcKFXPUFtHWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/+14155550100')
  .query(false)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'aXFNE3dQS0Wr+aC0R3a9GA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1153ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EMzMYAAAAACfhh7GaNiZSJXoebTY7IjOWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:41 GMT'
]);

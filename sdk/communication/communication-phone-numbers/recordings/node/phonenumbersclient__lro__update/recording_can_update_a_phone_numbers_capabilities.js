let nock = require('nock');

module.exports.hash = "c712c9c77d67bd041a87c0cfd72c611f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(true)
  .reply(202, {"capabilitiesUpdateId":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Operation-Location,Location,operation-id,capabilities-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'yFMKlHBLIECE90szhluE0g.0',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2022-01-11-preview2',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1352ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '06gTeYQAAAAAQ6ChIljxxTIcmPfofrlsKR1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"notStarted","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-01-11-preview2","createdDateTime":"2022-01-11T22:30:03.9651018+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'w1sljfBliEuMe7QAJ/3G1A.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '185ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07ATeYQAAAAASyFmib5VGQKWMEp6XZ3o9R1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-01-11-preview2","createdDateTime":"2022-01-11T22:30:03.9651018+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+/bWrXgc2EatPRnI+fsYew.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '270ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07gTeYQAAAAA5ZbUzt3frQ5nSwW9vS79tR1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-01-11-preview2","createdDateTime":"2022-01-11T22:30:03.9651018+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'DjL+4T96ck69aMYzvQf7Nw.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '183ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08QTeYQAAAADS3mucu4qzRZZ6mLd8wi6YR1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-01-11-preview2","createdDateTime":"2022-01-11T22:30:03.9651018+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+YA/Y7l1YUiqbFlEf0MVcA.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '187ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08wTeYQAAAACNBn6h8rvXQq47F9k6Q2uCR1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-01-11-preview2","createdDateTime":"2022-01-11T22:30:03.9651018+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'VGaCMxj4TEGC8khpXWOrfw.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '184ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09QTeYQAAAAACQgPLur2tR417F28QxlSdR1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/+14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-06-23T23:38:41.0997634+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+8tUbM5fnUq49C2fYM4lMQ.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1367ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+ATeYQAAAABofauugLppQ6n+ycMpwVaYR1JVMzBFREdFMDgxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:17 GMT'
]);

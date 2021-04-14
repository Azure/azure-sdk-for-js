let nock = require('nock');

module.exports.hash = "a67c24fb83fa73c79347edba2e1c864a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-26T22:41:03.6935096+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ATtBYKyn2Eufkrycv6sGvg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1023ms',
  'X-Azure-Ref',
  '0UNdsYAAAAADgS3NO2F2eSK5lgnrObjV/WVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"inbound+outbound","sms":"inbound"})
  .query(true)
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
  'FfxylwVGL0uTYsP9K1dWbQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '844ms',
  'X-Azure-Ref',
  '0UddsYAAAAADsYWXT94gqSrkgc+SaN3SiWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'ZTSw3WFAo0y/pPFJigSRTQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '262ms',
  'X-Azure-Ref',
  '0UtdsYAAAAAA2TcEmkn5JTK3ZiqKzLT7HWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'LIce0nZHgEOUATqKouY7wQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '265ms',
  'X-Azure-Ref',
  '0VddsYAAAAABuimdfKJWUSYyWmFXnjwPRWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'qE9tqSF7K0uFqIllOCj4Tw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '271ms',
  'X-Azure-Ref',
  '0V9dsYAAAAADuOIYlypzxQYwjws5w6BeBWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'eB+x5sqLCEeLypmD6CiT6Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '260ms',
  'X-Azure-Ref',
  '0WddsYAAAAAC6p5o5069ZS5a5i4K3dJ5rWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  '/Resct4h1k+HDkayWpEYfw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '258ms',
  'X-Azure-Ref',
  '0XNdsYAAAAAAh2X4bo9eBT7DvG8127IyrWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'QhuZxD5xskOR2mF+W37phQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '285ms',
  'X-Azure-Ref',
  '0XtdsYAAAAABdccYO7f/LTaSZtAiyL1hUWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-04-06T21:49:06.4573758+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'Og4VnPeXokmsILWgN7oPVQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '664ms',
  'X-Azure-Ref',
  '0YNdsYAAAAABMaZ1U76J9S6TXo0LdqixkWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/+14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound+outbound","sms":"inbound"},"assignmentType":"application","purchaseDate":"2021-03-26T22:41:03.6935096+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'wOSUAIx9kU20RHksGfhHvg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1338ms',
  'X-Azure-Ref',
  '0Y9dsYAAAAAAmlibB5PAATZxWlMsnp5iuWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:49:24 GMT'
]);

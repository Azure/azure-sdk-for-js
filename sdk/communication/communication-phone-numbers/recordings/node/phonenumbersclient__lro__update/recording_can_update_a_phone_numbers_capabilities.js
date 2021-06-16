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
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Operation-Location,Location,operation-id,capabilities-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  '5o8tH+cXXkW0LdL3xK9Q8A.0',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2169ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00YbKYAAAAACk5pfGGF0YTJFzs4l3cmoHWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-16T23:18:42.9783836+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'GbH73tW40UGv+W2krJ9BNw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '445ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '004bKYAAAAABQPSQZb4uuQreYIgyQ914LWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-16T23:18:42.9783836+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'WvQT6Jwpe0qRk4LpW/wzgQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '352ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01obKYAAAAAAD7sohX+1CTrC8cEiC5LBJWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-16T23:18:42.9783836+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'csbG//1KX06oTfyc1FT/Jg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '452ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02IbKYAAAAAAdhZDG1m03S5S6LcOTzvOMWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-16T23:18:42.9783836+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'Z+ECVSY6UU6KfSXChdnyOg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '524ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '024bKYAAAAABmJrH1g7YRQr6Mr84tloKhWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-16T23:18:42.9783836+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'nnG7TkB0u0+HONVZLQuTNw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '328ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03YbKYAAAAABFOzpmJAlKQYPIPRkw/hV3WVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/+14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Qsdz04AKxUqu1BxK1+ooJw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1301ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04IbKYAAAAAAj7+QIleU8SoyZp3IXchqIWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:57 GMT'
]);

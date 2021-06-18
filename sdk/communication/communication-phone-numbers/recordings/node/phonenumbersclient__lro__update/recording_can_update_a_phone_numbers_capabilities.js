let nock = require('nock');

module.exports.hash = "f2f91e9e3b2fcec2abbab05cb21095d4";

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
  '/Dvi63ipHkSIGnFOreEkog.0',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1786ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0lufLYAAAAACCQkSctq4SSrYuhog0CmRxWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:51.7837802+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'eQ5Id/wJeEyvt+5EBUPJUA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '513ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mOfLYAAAAAA/kHxfXlPpRb/Z7iQEGIYWWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:51.7837802+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'oW8Vs0DHrkqrxdEnjcSwQA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '360ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mufLYAAAAAC+vT94ejkxS7K4zs1HVlKnWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:51.7837802+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'AFYuMyO19kucR7uvmPsJ2A.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '348ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0nefLYAAAAAAenb0rvtLvSYiXR/fhS4f7WVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:51.7837802+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'piJuIXmyHkeavJD1FhCpUA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '437ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0n+fLYAAAAAA9ZmoPcKQvQJCJAKk1iqkVWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:51.7837802+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  '7zqP5Xa1yUKQ+DZSWJaMPQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '339ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oufLYAAAAACTVcWiaJoGSZ2j63azPem+WVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:24:01 GMT'
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
  'JlPW9hpMLkKa/61/ffA52Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1269ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0pOfLYAAAAAAbP+ngUjfNTqPYiGQ4Ael+WVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:24:05 GMT'
]);

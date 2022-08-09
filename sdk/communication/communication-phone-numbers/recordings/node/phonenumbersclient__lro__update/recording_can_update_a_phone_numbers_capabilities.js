let nock = require('nock');

module.exports.hash = "e6cc5d618425d7272789412e8ab34410";

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
  '/phoneNumbers/+14155550100?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Operation-Location,Location,operation-id,capabilities-id',
  'MS-CV',
  'Mat1YaqXLUiaaUqlRY+w8w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '1867ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0J/DyYgAAAADWECl4EDnvQIAmBt+gIkMJTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:39:20.6741203+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'zxmwFzUb1EqmtM4TiJ/wSQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '353ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0KfDyYgAAAACbOEaNNd5+S7FO6Rgh7ofETEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:39:20.6741203+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'JSJodtLp2kq34nYE5d/7pg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '362ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0K/DyYgAAAACwixbtKHpQRJJU8sSeSsxkTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:39:20.6741203+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'tV42X1gqokm88shS6FGbuw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '331ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LfDyYgAAAACFZ6tU8jC4T5R9p1H7k75lTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/+14155550100')
  .query(false)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-06-23T23:38:41.0997634+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft","phoneNumberSource":"cloud"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'fNVLrfrsI0yFP2nxslO+qQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '1514ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MPDyYgAAAADlwUzTo6FATJwRB4yQmMRVTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:29 GMT'
]);

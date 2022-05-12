let nock = require('nock');

module.exports.hash = "e6cc5d618425d7272789412e8ab34410";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"outbound","sms":"none"})
  .query(true)
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
  '5jJPNtQjEEqJfNFrdDb5gQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1827ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '059N7YgAAAACK0vLbHaZARbS8N5Ct+7RWUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:19:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(true)
  .reply(200, {"operationType":"updatePhoneNumberCapabilities","status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2022-06-01-preview","createdDateTime":"2022-05-11T15:19:05.3434832+00:00","id":"capabilities_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'aLxJmsxwQkSM9RAV+dLM0Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '433ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '06dN7YgAAAACuYNlOcQlXS4xiFmz8FbjOUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:19:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/+14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2022-04-14T17:41:49.974506+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft PPE (Dogfood)","phoneNumberSource":"cloud"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'jlkBTY2L1USWllEZ8Dm6bA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1404ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07NN7YgAAAAB0whMuRuw0Tb4o0k57xBO6UFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:19:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/+14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2022-04-14T17:41:49.974506+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft PPE (Dogfood)","phoneNumberSource":"cloud"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'WpkdkImAoECdBQEKlWH2wQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1568ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '079N7YgAAAABmV11oCfNxRq0PZaHRsb6uUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:19:13 GMT'
]);

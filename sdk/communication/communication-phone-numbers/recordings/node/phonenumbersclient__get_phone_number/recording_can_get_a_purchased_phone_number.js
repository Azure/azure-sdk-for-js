let nock = require('nock');

module.exports.hash = "81926634f1aac5905b7e29c24a246cb7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2022-03-14T18:26:44.3415816+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft PPE (Dogfood)","phoneNumberSource":"cloud"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lcT/T8Ja0UOBNhkr3kT6+w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1421ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UBJ9YgAAAADn2D8jaBxFSaLFqOafNGeKUFJHMDFFREdFMDcxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 12 May 2022 13:57:38 GMT'
]);

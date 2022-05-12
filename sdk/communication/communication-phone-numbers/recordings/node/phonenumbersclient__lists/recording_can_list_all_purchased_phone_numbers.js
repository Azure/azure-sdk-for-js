let nock = require('nock');

module.exports.hash = "bd8421f48be834cb51b404a6576a2583";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers')
  .query(true)
  .reply(200, {"phoneNumbers":[{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2022-03-14T18:26:44.3415816+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft PPE (Dogfood)","phoneNumberSource":"cloud"},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"inbound+outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2022-03-14T19:15:38.2651776+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"???","phoneNumberSource":"cloud"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '72O9RI8FS06h3Hxmm7BW7g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1370ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0VRJ9YgAAAAAtOCqZFJJISabbN1wzOLZDUFJHMDFFREdFMDcxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 12 May 2022 13:57:42 GMT'
]);

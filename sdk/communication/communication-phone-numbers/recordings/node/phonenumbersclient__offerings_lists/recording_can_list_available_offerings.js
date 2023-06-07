let nock = require('nock');

module.exports.hash = "2ec7edf89bf068deca5123a2968dc20a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/offerings')
  .query(false)
  .reply(200, {"phoneNumberOfferings":[{"phoneNumberType":"geographic","assignmentType":"person","availableCapabilities":{"calling":"inbound+outbound","sms":"none"},"cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"}},{"phoneNumberType":"geographic","assignmentType":"application","availableCapabilities":{"calling":"inbound+outbound","sms":"none"},"cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"}},{"phoneNumberType":"tollFree","assignmentType":"application","availableCapabilities":{"calling":"inbound+outbound","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'mCzAZcxfQEq4OmlEO1PkzA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-12-01',
  'X-Processing-Time',
  '993ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ygqSYwAAAAActOidItKhT6rAgp/NVfNWTUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:03:22 GMT'
]);

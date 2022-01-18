let nock = require('nock');

module.exports.hash = "c277fc9e40dbe9b6a340b0fd4b58a391";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-06-23T23:38:41.0997634+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '8MzUYpCrB02XdknMgTz26w.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1347ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ngTeYQAAAACl1Ks4o2ecRbZT2fTjeIP7UklPMDFFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:28:47 GMT'
]);

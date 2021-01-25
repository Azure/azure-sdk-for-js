let nock = require('nock');

module.exports.hash = "928546984836e09bc337975d29dfcdda";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/administration/phonenumbers/countries/US/areacodes', {"locationOptions":[{"labelId":"state","optionsValue":"CA"},{"labelId":"city","optionsValue":"NOAM-US-CA-LA"}]})
  .query(true)
  .reply(200, {"primaryAreaCodes":["213","818"],"secondaryAreaCodes":[],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'X3/1RBP6FU6xbMoggoWeBg.0',
  'X-Processing-Time',
  '367ms',
  'X-Azure-Ref',
  '0hOUFYAAAAACiEOFcrM6zQKCC1Jokqtl9RVdSMzBFREdFMDYxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:46:12 GMT'
]);

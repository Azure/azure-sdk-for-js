let nock = require('nock');

module.exports.hash = "60671db19ca89afa8a237eb0b0fb2474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005555555","to":["+18005551234"],"message":"test message","sendSmsOptions":{}})
  .query(true)
  .reply(200, {"messageId":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ToVdVNt+NEWZhHzkzkwpvA.0',
  'X-Processing-Time',
  '967ms',
  'X-Azure-Ref',
  '0zEdpXwAAAABq8JwYs3vaRbcx+35PCg3uWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 22 Sep 2020 00:39:41 GMT'
]);

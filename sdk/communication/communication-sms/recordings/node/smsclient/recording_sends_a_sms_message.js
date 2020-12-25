let nock = require('nock');

module.exports.hash = "cf38d97837dc5da79554291c769ff666";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","to":["+18005551234"],"message":"test message","sendSmsOptions":{}})
  .query(true)
  .reply(200, {"messageId":"Sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'RCYfn94WuEexo/lBvdpMjA.0',
  'X-Processing-Time',
  '739ms',
  'X-Azure-Ref',
  '0XTraXwAAAADA+2QKjs9VSYiiJ/IjcS/3QkVSMzBFREdFMDQyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Dec 2020 16:48:29 GMT'
]);

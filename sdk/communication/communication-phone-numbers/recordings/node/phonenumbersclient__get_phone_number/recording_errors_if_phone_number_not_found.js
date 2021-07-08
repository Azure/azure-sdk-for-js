let nock = require('nock');

module.exports.hash = "72d3da66787ce7ec1b5bd2e51979dcaa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Input phoneNumber +14155550100 cannot be found.","target":"phonenumber"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'AZ8qSl3bbUOTHzj9Jcll4Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '539ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bcvMYAAAAAB+AlTO8wGzRbUJewscu6gCWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:35:57 GMT'
]);

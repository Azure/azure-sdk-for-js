let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1614374194140"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://kimtestacs.communication.azure.com/chat/threads/19%3A78448d7234104d49a790bd99614da6e6@thread.v2/messages/1614374194140',
  'MS-CV',
  'neMiolRXZUWYh0Umqh4cfA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '245ms',
  'X-Azure-Ref',
  '0MmU5YAAAAAAX4S40Apv+TZ1ZZkG2G1fJWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:33 GMT'
]);

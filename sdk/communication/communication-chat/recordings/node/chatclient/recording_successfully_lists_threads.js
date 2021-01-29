let nock = require('nock');

module.exports.hash = "6645e10e1b9f1da9eda440773d0537f4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:a57caa80215748b484a26279925e5a92@thread.v2","topic":"test topic","isDeleted":false,"lastMessageReceivedOn":"2021-01-27T19:40:46Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Ad1PlaA4aEW4RMQyxfmgaA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '99ms',
  'X-Azure-Ref',
  '0vsERYAAAAACm3CH9rAv2R7I6JIWCPchjWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:46 GMT'
]);

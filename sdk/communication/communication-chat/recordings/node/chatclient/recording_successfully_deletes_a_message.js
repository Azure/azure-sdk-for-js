let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/messages/1611776447102')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'pBOqV88fxEK1mgfIcv4nEw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '169ms',
  'X-Azure-Ref',
  '0v8ERYAAAAADW2ynr80jTQoNg3nTXdvwCWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:47 GMT'
]);

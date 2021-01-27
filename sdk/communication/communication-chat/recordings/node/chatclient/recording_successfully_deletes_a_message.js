let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/messages/1611606392859')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ZVBkJE3bRU607P6nJdHxxA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '169ms',
  'X-Azure-Ref',
  '0fCkPYAAAAADonPfyOdOfRpIoSg3S+LKDWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:36 GMT'
]);

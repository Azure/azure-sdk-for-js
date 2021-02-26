let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/messages/1614374194140')
  .query(true)
  .reply(200, { "id": "1614374194140", "type": "text", "sequenceId": "4", "version": "1614374194140", "content": { "message": "content" }, "senderDisplayName": "", "createdOn": "2021-02-26T21:16:34Z", "senderId": "8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5" }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'QEVQ8+m5uESzIvcAGS89gg.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '117ms',
    'X-Azure-Ref',
    '0MmU5YAAAAABKZWTWvG+sTqyoKL4LVN2JWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
    'Date',
    'Fri, 26 Feb 2021 21:16:34 GMT'
  ]);

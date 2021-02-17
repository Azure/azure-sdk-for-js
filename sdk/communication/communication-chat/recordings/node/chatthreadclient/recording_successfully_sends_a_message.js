let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/messages', { "content": "content" })
  .query(true)
  .reply(201, { "id": "1614300005782" }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Location',
    'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899@thread.v2/messages/1614300005782',
    'MS-CV',
    'LbdPkc7G7UmqemhTyr2RXQ.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '219ms',
    'X-Azure-Ref',
    '0ZUM4YAAAAAAlXJGGUJkXQbINaL4zmbpXV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:05 GMT'
  ]);

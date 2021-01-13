let nock = require('nock');

module.exports.hash = "07eac232cd3a9dc288c9c1c7b401f64d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-8307-0e04-343a0d001200"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'YZOA+zy4ZUSXRB6H33mHqw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '46ad2a17-4c2d-48ed-9c0d-b53cbc724d8a',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '22ms',
  'X-Azure-Ref',
  '0ulX+XwAAAABhElc5zxBdQqj6rl84plB3V1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-8307-0e04-343a0d001200/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-8307-0e04-343a0d001200","token":"token","expiresOn":"2021-01-14T02:06:49.203026+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'OdymPnH2/UWyzr5l5xOA/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '58c89705-0c38-4131-9d2c-754c938f0080',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '24ms',
  'X-Azure-Ref',
  '0ulX+XwAAAAD3aEZkR2JnQZXnAFssYV+AV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/participants/:add', {"participants":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-8307-0e04-343a0d001200","shareHistoryTime":"2020-05-26T18:06:06.000Z"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'tlGqIx4T7E+BNmlSSxvnag.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '282ms',
  'X-Azure-Ref',
  '0ulX+XwAAAAC1fFpvOh71QbrT2Ezc4LckV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:50 GMT'
]);

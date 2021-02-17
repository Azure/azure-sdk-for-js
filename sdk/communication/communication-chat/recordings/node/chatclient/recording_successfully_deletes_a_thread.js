let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .delete('/chat/threads/19%3A1f461ee8cb574f2d8f3512e619090971%40thread.v2')
  .query(true)
  .reply(204, "", [
    'MS-CV',
    'I3zB1SOr40mEjzM2lCEzBA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '253ms',
    'X-Azure-Ref',
    '0Y0M4YAAAAAAHSleAy/BnS6p/OrfIMkZZV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:02 GMT'
  ]);

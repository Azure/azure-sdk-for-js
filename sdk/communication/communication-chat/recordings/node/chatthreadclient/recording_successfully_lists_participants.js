let nock = require('nock');

module.exports.hash = "f1540480364826ffb5d1fb494e40584f";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/participants')
  .query(true)
  .reply(200, { "value": [{ "communicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } }, "shareHistoryTime": "1970-01-01T00:00:00Z" }, { "communicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775" } }, "shareHistoryTime": "1970-01-01T00:00:00Z" }, { "communicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-ef5f-28c5-593a0d00f777", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-ef5f-28c5-593a0d00f777" } }, "shareHistoryTime": "1970-01-01T00:00:00Z" }] }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'vyh61b9BgEub497I/89oZA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '127ms',
    'X-Azure-Ref',
    '0Z0M4YAAAAAAtO8TyNLoLQZnBNnB62K7DV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:07 GMT'
  ]);

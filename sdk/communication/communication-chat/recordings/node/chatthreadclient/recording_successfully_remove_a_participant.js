let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/participants/:remove', { "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775" } })
  .query(true)
  .reply(204, "", [
    'MS-CV',
    'cX4oHN2RkEaboqHneGKXng.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '204ms',
    'X-Azure-Ref',
    '0aEM4YAAAAAAUs+ERIGxRSrsgdeDQqlErV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:07 GMT'
  ]);

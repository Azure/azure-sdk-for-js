let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-79e2-7f07-113a0d002200"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'xklCp5Bk1Um4nfCSTGhVCw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '292ms',
  'X-Azure-Ref',
  '0B81GYAAAAADunnLr+Zl9TaStDXGYt/sPV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:03 GMT'
]);

let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-0986-0e04-343a0d0064e1"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ofZs5Z8bJE+FXSav0pGGtQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '309ms',
  'X-Azure-Ref',
  '01T5aYAAAAAC9OuCQvP+oRYPXMEvwE03QV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:41 GMT'
]);

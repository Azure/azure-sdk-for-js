let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8af1-b5bb-a43a0d002190"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '+lWmpIfj7UKIoG5R9HaDhA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '160ms',
  'X-Azure-Ref',
  '0KYdGYAAAAAAgqNYA3pWYQbccZRUYr+cvV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:57 GMT'
]);

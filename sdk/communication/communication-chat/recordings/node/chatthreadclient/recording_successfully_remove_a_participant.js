let nock = require('nock');

module.exports.hash = "95d8e7f0df4d2e1894f7edb044ad665a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5f01-63b2-a43a0d002ec6"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'KzCY2LMtMU68NwuraGSV0g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '245ms',
  'X-Azure-Ref',
  '0Dc9GYAAAAAAMm8ZqisGSR5h8gS9t+G5fV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:41 GMT'
]);

let nock = require('nock');

module.exports.hash = "14461ac52da624edf8573738ab4dde0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'FX2WsIoyG0SF6UMGGKjKCA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '258ms',
  'X-Azure-Ref',
  '017mAYAAAAAD2696nEHRwQ7gjIUUJK3HzV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:39 GMT'
]);

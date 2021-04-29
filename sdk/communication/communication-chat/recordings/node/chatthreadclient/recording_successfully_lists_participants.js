let nock = require('nock');

module.exports.hash = "99c3f986f6988aba27f12dd5d2b5c9de";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-9228-edbe-a43a0d0092e2","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-9228-edbe-a43a0d0092e2"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'GYDQ6xOW90OFQ2pXgTqC/g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '141ms',
  'X-Azure-Ref',
  '017mAYAAAAADiPKUUblsZTLSRKcZIp8WAV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:38 GMT'
]);

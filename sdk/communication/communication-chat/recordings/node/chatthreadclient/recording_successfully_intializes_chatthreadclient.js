let nock = require('nock');

module.exports.hash = "c738d546d92fce543095dc086c6ade6a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"},"accessToken":{"token":"token","expiresOn":"2021-04-22T23:48:33.1707894+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '4OaGfgNraEWMrQkrLRM+ww.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '1293580b-d963-4127-a917-fd181d3c12db',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '441ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00bmAYAAAAADbuk/iyo66TJ2vPkRvbQtgV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3"},"accessToken":{"token":"token","expiresOn":"2021-04-22T23:48:33.3754292+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'xsinBT6D20yIY+nuC22Zag.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7fb47248-1d85-4f69-8441-8fd5402360a4',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '131ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00rmAYAAAAAACf9iaAwo0T5s6ZS4FAjQyV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:ScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1@thread.v2","topic":"test topic","createdOn":"2021-04-21T23:48:34Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1@thread.v2',
  'MS-CV',
  'xny4H88A1Ui0q/wNTNh9Zg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '947ms',
  'X-Azure-Ref',
  '00rmAYAAAAAAkO4RQ+1BOTKYqctWIz2WOV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:34 GMT'
]);

let nock = require('nock');

module.exports.hash = "7773fe1dea889ef2b3ef6767a631e1c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-813b-b5bb-a43a0d00218c"},"accessToken":{"token":"token","expiresOn":"2021-03-09T20:20:49.2255149+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'VBwHdKlQPUiweL663I9rTg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'f1660eb2-3853-4f17-85fc-eac1e047c034',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '258ms',
  'X-Azure-Ref',
  '0IYdGYAAAAADgtjZQSBt2SJg5Sfvbp4LaV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8290-b5bb-a43a0d00218d"},"accessToken":{"token":"token","expiresOn":"2021-03-09T20:20:49.584197+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'PuQHqIKJ9ESasnkTfPBb/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'a92c556d-a05f-49da-980c-366286043839',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '233ms',
  'X-Azure-Ref',
  '0IodGYAAAAAA4GObXgu8rQrRC8daUQmqWV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-813b-b5bb-a43a0d00218c"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8290-b5bb-a43a0d00218d"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:0ec6d22627d54b5782f1d45b601c494a@thread.v2","topic":"test topic","createdOn":"2021-03-08T20:20:50Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-813b-b5bb-a43a0d00218c","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-813b-b5bb-a43a0d00218c"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A0ec6d22627d54b5782f1d45b601c494a@thread.v2',
  'MS-CV',
  'axgN6i8uN0WAg6kbKncuYg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '476ms',
  'X-Azure-Ref',
  '0IodGYAAAAAB3XQUMPHFLT5PkQBZ4QserV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:50 GMT'
]);

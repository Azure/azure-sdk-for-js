let nock = require('nock');

module.exports.hash = "f86542f66a605c5bc104dbd7a9e1b9f3";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/identities', { "createTokenWithScopes": ["chat"] })
  .query(true)
  .reply(201, { "identity": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" }, "accessToken": { "token": "token", "expiresOn": "2021-02-27T00:40:02.8181269+00:00" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Request-Context',
    'appId=',
    'MS-CV',
    'NK3i+oCkgUCLj3QD4r+EJw.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'x-ms-client-request-id',
    '8ea6ee39-d411-4089-91d3-cf5e5dcc058b',
    'api-supported-versions',
    '2020-07-20-preview2, 2021-03-07',
    'X-Processing-Time',
    '271ms',
    'X-Azure-Ref',
    '0Y0M4YAAAAABbWuPRAvJMQr2yYBJPFJmsV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:02 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/identities', { "createTokenWithScopes": ["chat"] })
  .query(true)
  .reply(201, { "identity": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775" }, "accessToken": { "token": "token", "expiresOn": "2021-02-27T00:40:02.9209887+00:00" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Request-Context',
    'appId=',
    'MS-CV',
    'MWJ+uXu0pkO+hwfHLSCVkg.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'x-ms-client-request-id',
    '56d1c290-181e-4d3f-9c47-281a3889bc98',
    'api-supported-versions',
    '2020-07-20-preview2, 2021-03-07',
    'X-Processing-Time',
    '29ms',
    'X-Azure-Ref',
    '0Y0M4YAAAAABsJCAJ43anTJTOwCRRWTFRV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:03 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads', { "topic": "test topic", "participants": [{ "communicationIdentifier": { "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } } }, { "communicationIdentifier": { "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775" } } }] })
  .query(true)
  .reply(201, { "chatThread": { "id": "19:7190b8f01425417281a9998f4e6f8899@thread.v2", "topic": "test topic", "createdOn": "2021-02-26T00:40:04Z", "createdByCommunicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } } } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Location',
    'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899@thread.v2',
    'MS-CV',
    'mELcOxF5y0mXGaYgxfCsCA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '1048ms',
    'X-Azure-Ref',
    '0Y0M4YAAAAADhUOvVpSwwRImsNa38DWojV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:04 GMT'
  ]);

let nock = require('nock');

module.exports.hash = "7773fe1dea889ef2b3ef6767a631e1c4";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/identities', { "createTokenWithScopes": ["chat"] })
  .query(true)
  .reply(201, { "identity": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-d789-28c5-593a0d00f772" }, "accessToken": { "token": "token", "expiresOn": "2021-02-27T00:40:00.4195703+00:00" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Request-Context',
    'appId=',
    'MS-CV',
    'Q3QKOn+Z3kWSZ8m3WUFNkA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'x-ms-client-request-id',
    '7951523e-b207-45ef-88b3-03a4c2b07d48',
    'api-supported-versions',
    '2020-07-20-preview2, 2021-03-07',
    'X-Processing-Time',
    '291ms',
    'X-Azure-Ref',
    '0YEM4YAAAAADEMf3mXBKORpmFNd++JwqBV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:00 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/identities', { "createTokenWithScopes": ["chat"] })
  .query(true)
  .reply(201, { "identity": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-d8d8-28c5-593a0d00f773" }, "accessToken": { "token": "token", "expiresOn": "2021-02-27T00:40:00.7633372+00:00" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Request-Context',
    'appId=',
    'MS-CV',
    'XO3u8E9yEUmI6019gR3W6g.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'x-ms-client-request-id',
    '623d9f3a-ac01-4127-9004-4b95c5410da4',
    'api-supported-versions',
    '2020-07-20-preview2, 2021-03-07',
    'X-Processing-Time',
    '277ms',
    'X-Azure-Ref',
    '0YUM4YAAAAADHfIJYH13QSIsQ9479OtsxV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:00 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads', { "topic": "test topic", "participants": [{ "communicationIdentifier": { "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-d789-28c5-593a0d00f772" } } }, { "communicationIdentifier": { "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-d8d8-28c5-593a0d00f773" } } }] })
  .query(true)
  .reply(201, { "chatThread": { "id": "19:1f461ee8cb574f2d8f3512e619090971@thread.v2", "topic": "test topic", "createdOn": "2021-02-26T00:40:02Z", "createdByCommunicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-d789-28c5-593a0d00f772", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-d789-28c5-593a0d00f772" } } } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Location',
    'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A1f461ee8cb574f2d8f3512e619090971@thread.v2',
    'MS-CV',
    'Mtudt/K0g0iVMOHKfO6rJA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '940ms',
    'X-Azure-Ref',
    '0YkM4YAAAAAAkUzNPFPuFRKaatSrh8/GfV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:02 GMT'
  ]);

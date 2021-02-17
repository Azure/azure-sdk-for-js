let nock = require('nock');

module.exports.hash = "c4d25ce2dae933df88a1c5b7a57529ba";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/identities', { "createTokenWithScopes": ["chat"] })
  .query(true)
  .reply(201, { "identity": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-ef5f-28c5-593a0d00f777" }, "accessToken": { "token": "token", "expiresOn": "2021-02-27T00:40:06.5310837+00:00" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Request-Context',
    'appId=',
    'MS-CV',
    'Qu/WLYJhNkmCrb2YZ4PFWw.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'x-ms-client-request-id',
    'b29febcb-a259-47ae-9e51-a84291fe3231',
    'api-supported-versions',
    '2020-07-20-preview2, 2021-03-07',
    'X-Processing-Time',
    '279ms',
    'X-Azure-Ref',
    '0Z0M4YAAAAADAdjgpjwCLRYmXHpaJz2N4V1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:06 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/participants/:add', { "participants": [{ "communicationIdentifier": { "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-ef5f-28c5-593a0d00f777" } } }] })
  .query(true)
  .reply(201, {}, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'wicHo4W/XEO+JvIIu46rGA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '347ms',
    'X-Azure-Ref',
    '0Z0M4YAAAAAAj6W5f6U5FQqWKKMDAbv9HV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:07 GMT'
  ]);

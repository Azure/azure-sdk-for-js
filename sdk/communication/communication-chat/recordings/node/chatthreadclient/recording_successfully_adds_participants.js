let nock = require('nock');

module.exports.hash = "c4d25ce2dae933df88a1c5b7a57529ba";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/identities', { "createTokenWithScopes": ["chat"] })
  .query(true)
  .reply(201, { "identity": { "id": "8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-f599-ceb1-a43a0d00e5c7" }, "accessToken": { "token": "token", "expiresOn": "2021-02-27T21:16:35.0476779+00:00" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Request-Context',
    'appId=',
    'MS-CV',
    'dGs8D78COE2/5w1G/xDhvQ.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'x-ms-client-request-id',
    '123e5bab-9bfa-493f-94b9-510b47922256',
    'api-supported-versions',
    '2020-07-20-preview2, 2021-03-07',
    'X-Processing-Time',
    '557ms',
    'X-Azure-Ref',
    '0M2U5YAAAAAAjDmihErSoRYQvA4FcIHf5WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
    'Date',
    'Fri, 26 Feb 2021 21:16:35 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/participants/:add', { "participants": [{ "id": "8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-f599-ceb1-a43a0d00e5c7" }] })
  .query(true)
  .reply(201, {}, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'gL8UHiZ2vUaNhHT3irEROg.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '160ms',
    'X-Azure-Ref',
    '0NGU5YAAAAACY9xHISHAwS7DSawGB0VB9WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
    'Date',
    'Fri, 26 Feb 2021 21:16:35 GMT'
  ]);

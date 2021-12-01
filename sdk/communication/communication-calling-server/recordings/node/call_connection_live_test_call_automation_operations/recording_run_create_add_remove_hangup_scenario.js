let nock = require('nock');

module.exports.hash = "87d011e9add82d12715722c22dd25b54";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-22e3-c6a1-2c8a-084822004ab6"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'xacO3s3TC0OyKJNwGhgedw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '94e9eaec-15b1-425d-b6b0-c1f3bcf8212f',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '23ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DsGqYQAAAACIxbePx1xSS5y8Idz+5zMaV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:14:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-22e3-c6a1-2c8a-084822004ab6"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"94201300-e019-4d4d-96c5-744c5b7b2345"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '29007b5d-65bd-453d-8e54-aacf08a14007',
  'X-Microsoft-Skype-Chain-ID',
  'c44642d4-2857-4664-ac66-e78ddf4f0b95',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0D8GqYQAAAAD1ctBb3K9tSJtoaAXB1IKHV1NURURHRTA4MTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:14:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/94201300-e019-4d4d-96c5-744c5b7b2345/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-22e2-d9a2-99c6-593a0d004ca1"}}})
  .query(true)
  .reply(202, {"operationId":"28d043df-121c-478d-adb2-194dfe0862d4","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'c6a8572a-eab9-450c-907e-f7fb0c34345a',
  'x-ms-client-request-id',
  '63c20ffc-a395-4ef5-ac18-32c10df0e256',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HsGqYQAAAAAn9rMHKXVWQ7ewb/qASY/lV1NURURHRTA4MTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:15:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/94201300-e019-4d4d-96c5-744c5b7b2345/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-22e2-d9a2-99c6-593a0d004ca1"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'ed2e7a9c-5286-42d4-aaba-a71d06bffd63',
  'x-ms-client-request-id',
  '3e3de749-f2ca-475c-8f17-6089fdf796b8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LsGqYQAAAAAeb5/Z5fn2QYKR/nldszVjV1NURURHRTA4MTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:15:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/94201300-e019-4d4d-96c5-744c5b7b2345/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '9ce4db18-a815-4f7a-b9b3-3031b15cc30d',
  'x-ms-client-request-id',
  '0f3b9ed6-7b06-4fc6-ac2c-5533516eb5bb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0PcGqYQAAAADuKfbGq/NTTobuN9Oe9NY1V1NURURHRTA4MTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:15:41 GMT',
  'Content-Length',
  '0'
]);

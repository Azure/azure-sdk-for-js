let nock = require('nock');

module.exports.hash = "5f2347fabaf2705c0ec1f204ba5f0678";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId163670234793509037","operationContext":"operationContext163670234793607416"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-b2f1-8352-0d8b-084822003aec"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'FJRajSsyEECU3Sg/d7+jtA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '19d0754e-13d8-475b-99fe-7c608b5e7b5e',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '23ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ixiOYQAAAAC2Af3TiAuyQZEx+pj4qXUFV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:32:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-b2f1-8352-0d8b-084822003aec"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"83201300-ae79-4363-819c-6686264333cb"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'b3964a2a-0d0b-4f22-a4ab-ee6979d4dd35',
  'X-Microsoft-Skype-Chain-ID',
  'ae886713-7143-4d08-a1f3-5797d9bdf83e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ixiOYQAAAADs2ANeWkGmS5KdlrU/KkoYV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:32:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/83201300-ae79-4363-819c-6686264333cb/:playAudio', {"audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext163670234793607416","audioFileId":"audioFileId163670234793509037","callbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(202, {"operationId":"6b0dcf66-7ca5-4808-a507-8e6f9da5c66f","status":"running","operationContext":"operationContext163670234793607416"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'f5f5f570-8f6f-4cff-9bc4-75c02f8406ce',
  'x-ms-client-request-id',
  '2f348b79-a708-425d-91b1-dfaf6a6343a2',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mhiOYQAAAAB7EEaFKChcQLvQL3SIAuFCV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:32:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/83201300-ae79-4363-819c-6686264333cb/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"4f1a52e8-ea8e-45a5-8195-8c806332028c","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'de2d23af-aabb-431c-9630-be7b7b4911e6',
  'x-ms-client-request-id',
  'bd301721-ae09-4780-9e4a-95b41d2a7535',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0qhiOYQAAAADvK4bR61r6RJh1SRkyo5uLV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:32:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/83201300-ae79-4363-819c-6686264333cb/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '248bddaf-dba8-4adc-829e-088d44d860c2',
  'x-ms-client-request-id',
  '260fb95d-072b-4533-be1c-490c1a5bbc89',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uRiOYQAAAACwuY5DVjyoTIyfYnA3WwsIV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:33:13 GMT',
  'Content-Length',
  '0'
]);

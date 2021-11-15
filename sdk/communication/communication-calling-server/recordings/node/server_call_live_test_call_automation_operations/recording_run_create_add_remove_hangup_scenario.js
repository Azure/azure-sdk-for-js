let nock = require('nock');

module.exports.hash = "d20d4d0afc0c898da25282bd7ee6eaa5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"80201300-4615-461d-8268-4ea7a318c985"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '5cbe8c69-dcbd-4843-b0d2-b5c36a5411fa',
  'X-Microsoft-Skype-Chain-ID',
  '4d2f414d-c3df-40f2-a8b3-c0cb883d0fc5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vtKQYQAAAACcjeF3A4B3QYezAWgA5zlBV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:11:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"80201300-3a88-42c7-bb20-4cdc9e87ab99"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '8f0a0144-62bc-4819-ac73-9999f65a0e44',
  'X-Microsoft-Skype-Chain-ID',
  'c595e382-8f14-4301-86df-91fe0e0a3f68',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wNKQYQAAAACG9x8HPvnjSKmjrGXgO63AV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:11:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-bd96-2256-02c3-593a0d00b537"}},"callbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(202, {"participantId":"9d88edb6-f2af-4338-ac94-44829952f2d8"}, [
  'Content-Length',
  '56',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'e4ed3b93-7c7b-42a3-831c-5df0967093fb',
  'X-Microsoft-Skype-Chain-ID',
  '80fd04cc-d265-43e4-be0f-cdd1798daf52',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0z9KQYQAAAAAObXoUrfPEQ4JM7cx2jR/qV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:11:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:remove', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-bd96-2256-02c3-593a0d00b537"}}})
  .query(true)
  .reply(202, "", [
  'x-ms-client-request-id',
  'e798c961-e2f1-4904-bf72-7591be4cf15a',
  'X-Microsoft-Skype-Chain-ID',
  '65906910-1c1e-41ec-a7d6-34e4f49b887d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '039KQYQAAAAB8eXcwD5amSYRj/jP91yokV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:11:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/80201300-4615-461d-8268-4ea7a318c985/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'fbf8e4d0-4662-4748-b6a2-f59273000333',
  'x-ms-client-request-id',
  'beb43216-4138-44e0-aa3d-bdc3cfdbb4e1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '079KQYQAAAADkgMiM+lKtTZayOyX+6E/pV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:12:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/80201300-3a88-42c7-bb20-4cdc9e87ab99/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'da5c7866-fe1e-4b54-8b80-8c3bfc8d1efc',
  'x-ms-client-request-id',
  '13a56129-9d48-4950-b486-49d402fdf46e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '079KQYQAAAACCHWn7gLxhRr0cs627yUhUV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:12:15 GMT',
  'Content-Length',
  '0'
]);

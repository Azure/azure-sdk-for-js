let nock = require('nock');

module.exports.hash = "e18db4fdc7e2741a8b16cc72ff42ac0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"a3201300-87c8-4609-9af3-9ab7908600b3"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'ec972564-365a-4cc8-a339-1f5d21ff2635',
  'X-Microsoft-Skype-Chain-ID',
  'a6d7788c-f27a-4786-a983-41c783882ead',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0i8KqYQAAAAAfHCwTepy/Tar6OZPPGPU1V1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:21:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"a3201300-2dfd-47cc-84cc-17e136e2dfb7"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '2dc9c06f-8ddb-4c00-8eb6-80f1432f01ff',
  'X-Microsoft-Skype-Chain-ID',
  'c79d8e60-fde3-47b8-859d-595e5bd9c245',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jMKqYQAAAADFnx0I3KfgR4sYRsvyGVHnV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:21:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"callbackUri":"https://endpoint/callback","participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-22e2-d9a2-99c6-593a0d004ca1"}}})
  .query(true)
  .reply(202, {"operationId":"e4160a3e-e66d-4bd0-a6f9-f3606558e094","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '4f2cc90c-be76-41e5-8158-c10564602413',
  'X-Microsoft-Skype-Chain-ID',
  'fb1387ea-2568-40f3-ab95-021c01d1c041',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0nMKqYQAAAADRCyMdKzM8SqHOtX3om+8YV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:21:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:remove', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-22e2-d9a2-99c6-593a0d004ca1"}}})
  .query(true)
  .reply(202, "", [
  'x-ms-client-request-id',
  'e1083d57-7509-4a5d-826f-c67faea415fe',
  'X-Microsoft-Skype-Chain-ID',
  '92f49cc5-32ae-482a-bc8a-e7c275270a4c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0q8KqYQAAAACtiRGs6MabRrDziLLAaFmHV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:21:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/a3201300-87c8-4609-9af3-9ab7908600b3/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '59fef062-033f-4c71-aa95-4bc5643adfa0',
  'x-ms-client-request-id',
  '445ed0c7-57e7-41a2-874f-a081dc64738a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0u8KqYQAAAACGtZzyCv39TqgO+PiRmzwqV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:22:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/a3201300-2dfd-47cc-84cc-17e136e2dfb7/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7348efe7-747f-401e-9694-3dc1029f3996',
  'x-ms-client-request-id',
  'bc9df660-47f5-48d6-b7e9-71dba56d9271',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0u8KqYQAAAAAhcmU2AlKCS5hEJ6F2+BA0V1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 04 Dec 2021 01:22:03 GMT',
  'Content-Length',
  '0'
]);

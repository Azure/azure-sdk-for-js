let nock = require('nock');

module.exports.hash = "2322a165cac69658ff57be08e6cb50e2";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164217469725705375","operationContext":"operationContext164217469725709508"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"1f201300-dcb0-4ca0-890c-7c5e3d269479"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '08b53ed6-6282-4168-bf0f-4e60d933bea7',
  'X-Microsoft-Skype-Chain-ID',
  'a095b0a4-5387-48ef-bff1-4a00a49f6fb7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03ZjhYQAAAAAiS7QsDWzXToIm0oTJzVKcREVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"1f201300-10b6-478e-8585-a0c191b2d20b"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '9ebdc6ca-406a-4830-bc22-bb360b6c58c4',
  'X-Microsoft-Skype-Chain-ID',
  '41fd4c84-6586-4cda-8b75-f794033adc61',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '035jhYQAAAABl+jcKieF7TbSqxGxf0XjTREVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"callbackUri":"https://endpoint/callback","participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f45b-ea62-69f0-553a0d000139"}}})
  .query(true)
  .reply(202, {"operationId":"266a25cd-264b-437d-99ef-a018d2cee860","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '2e5a4c6e-6492-4732-b3de-6bc12bff08a9',
  'X-Microsoft-Skype-Chain-ID',
  'c862a8ee-9cf5-45f4-8c94-4df3a9dd82ea',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '045jhYQAAAAApl7WBzBd1RLjdI3F2chQJREVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:playAudio', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f45b-ea62-69f0-553a0d000139"}},"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"callbackUri":"https://endpoint/callback","audioFileUri":"https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164217469725709508","audioFileId":"audioFileId164217469725705375"})
  .query(true)
  .reply(202, {"operationId":"1f201300-4796-44bf-a5bb-98d3475c6d1f","status":"running","operationContext":"operationContext164217469725709508"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'cad18096-6d93-4664-aae2-bc9e1bd4de50',
  'X-Microsoft-Skype-Chain-ID',
  '5d5dd17c-4286-4211-9a0c-59a4fd3d319b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+ZjhYQAAAAC55NiQOvXvS7g7QzFDKx72REVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:cancelMediaOperation', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f45b-ea62-69f0-553a0d000139"}},"mediaOperationId":"1f201300-4796-44bf-a5bb-98d3475c6d1f"})
  .query(true)
  .reply(200, "", [
  'x-ms-client-request-id',
  '92cfa3a0-18a6-45c3-999a-6640308ea42d',
  'X-Microsoft-Skype-Chain-ID',
  '771d2949-8e91-458a-85f5-36b194d288e1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ApnhYQAAAAB+rdZWTt/1SaiOmqB/rXkNREVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:remove', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f45b-ea62-69f0-553a0d000139"}}})
  .query(true)
  .reply(202, "", [
  'x-ms-client-request-id',
  '3518b758-5be2-4465-bab6-3c8886921c29',
  'X-Microsoft-Skype-Chain-ID',
  '6d1a1592-d9f9-4c60-bf6c-536f59b4fa39',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0B5nhYQAAAAA80KPCoOloR4U08wa3JXUvREVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/1f201300-dcb0-4ca0-890c-7c5e3d269479/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '33b2528c-f2a9-4c36-af17-817df3e5f439',
  'x-ms-client-request-id',
  'efd37dfb-bc6c-46a2-9197-9f9bd25c7acf',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DJnhYQAAAABFHXjfSOLxRK9T/MphzgxhREVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/1f201300-10b6-478e-8585-a0c191b2d20b/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '33b2528c-f2a9-4c36-af17-817df3e5f439',
  'x-ms-client-request-id',
  '136631da-60a1-4386-abe3-c37f08bbaf4c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DJnhYQAAAAAAzTXzPeoiS6ZhUho4bGh0REVMMDFFREdFMDYwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:38:52 GMT',
  'Content-Length',
  '0'
]);

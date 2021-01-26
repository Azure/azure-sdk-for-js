let nock = require('nock');

module.exports.hash = "bbd2bac67435ebeb9a6b8f56f717e8d5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1160-1655-373a0d0032e7"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lT9ymA7HBU2FriFYkw9rDA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '6801cc01-2e64-47b3-9edc-f2a798d4af65',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '18ms',
  'X-Azure-Ref',
  '03GoQYAAAAAB1xt5tb+ogR4rPobpr6E7eWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1160-1655-373a0d0032e7/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1160-1655-373a0d0032e7","token":"token","expiresOn":"2021-01-27T19:17:47.8729972+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ZhtXcVqOnkOdmoDf9s9KLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'd5922dd5-f39d-4216-88c9-89fc5ec90157',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '291ms',
  'X-Azure-Ref',
  '03GoQYAAAAADXmlXeYhWhTLBTdII4EUInWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-130b-1655-373a0d0032e8"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'oc47j26VakucB4vPYqO5TQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '3a129553-200d-4f5f-886a-487bb52a32ee',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '31ms',
  'X-Azure-Ref',
  '03GoQYAAAAAC8VTnTzOMUT4AVr1gcx8anWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-130b-1655-373a0d0032e8/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-130b-1655-373a0d0032e8","token":"token","expiresOn":"2021-01-27T19:17:48.0739604+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HlWyLo2Qj0S7JLaH6ItIWQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '93fa3256-06b1-487f-a0de-ff68de267b10',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '87ms',
  'X-Azure-Ref',
  '03GoQYAAAAAC1iEc3Vs47TajmefERb+7lWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1160-1655-373a0d0032e7"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-130b-1655-373a0d0032e8"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:1ce7006b95cc40b7863802c0b37784aa@thread.v2","topic":"test topic","createdOn":"2021-01-26T19:17:49Z","createdBy":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1160-1655-373a0d0032e7"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A1ce7006b95cc40b7863802c0b37784aa@thread.v2',
  'MS-CV',
  'YoRsd2bxy0GhTF8JtpwIJA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '961ms',
  'X-Azure-Ref',
  '03WoQYAAAAABwqmewlTI2TrFh2gv249QmWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:49 GMT'
]);

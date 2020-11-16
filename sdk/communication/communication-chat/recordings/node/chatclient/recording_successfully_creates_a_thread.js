let nock = require('nock');

module.exports.hash = "e025e37348eb4e48ff1e5ef6dc4e19f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'KsIb23Ehi0GgfA0NjRt+gQ.0',
  'x-ms-client-request-id',
  'd23a79e0-1c5f-40df-892d-5739691caf4c',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '201ms',
  'X-Azure-Ref',
  '06g+zXwAAAAA1tLUdUbSYTI6M3bn1mWHVV1NURURHRTA4MDYANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:48:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","token":"token","expiresOn":"2020-11-17T23:48:57.3530465+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'kixroSSf7Ueuy8CDBn6yYw.0',
  'x-ms-client-request-id',
  '22af8bde-e1d9-4a66-b09d-1f1c2ebbac6c',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '634ms',
  'X-Azure-Ref',
  '06g+zXwAAAAAmoyphefqxTon9xs+smWs2V1NURURHRTA4MDYANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:48:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'TLdaNdcvHEKGnnzTsumSCg.0',
  'x-ms-client-request-id',
  'ae49c708-36f1-4548-8163-326b728eea66',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '183ms',
  'X-Azure-Ref',
  '06w+zXwAAAADx8QSF7lszTa/gbVA10QnZV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:48:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b","token":"token","expiresOn":"2020-11-17T23:48:59.5133783+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'yd2NK4dqRUazeh3yKHF4MA.0',
  'x-ms-client-request-id',
  '689c1e7a-8b11-4d0a-88f5-8c722f515883',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '633ms',
  'X-Azure-Ref',
  '06w+zXwAAAACKaM0wpDdySr9CK5qlCB7MV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:48:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b"}]})
  .query(true)
  .reply(201, {"id":"19:08f3db9af86044bfa21eb8b02b847f22@thread.v2","topic":"test topic","createdOn":"2020-11-16T23:49:01Z","createdBy":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","participants":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22@thread.v2',
  'MS-CV',
  '/uzOwUnI7EOxsWuZmwDKxg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '1399ms',
  'X-Azure-Ref',
  '07A+zXwAAAACWlYmbRC5lT7xRXVOg/QlEV1NURURHRTA4MTQANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:01 GMT'
]);

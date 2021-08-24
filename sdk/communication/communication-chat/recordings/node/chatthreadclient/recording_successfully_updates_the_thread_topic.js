let nock = require('nock');

module.exports.hash = "583421fca0c161e20873222c40e6e511";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '8YgIAif11EifWJ9YcTb8CQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '223ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GEkkYQAAAAD4p3jzRNfXQ6qbGCPXRYQhUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41@thread.v2","topic":"new topic","createdOn":"2021-08-24T01:19:19Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'PL7dibnAzUKzTtKSCAwbdw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '135ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GUkkYQAAAADcyh/DvjIBRIB8QOwbyniqUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:20 GMT'
]);

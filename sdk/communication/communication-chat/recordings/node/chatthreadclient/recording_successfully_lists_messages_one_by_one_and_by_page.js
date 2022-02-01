let nock = require('nock');

module.exports.hash = "9877a13348edae7bbcff8d83d7659bb6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2/messages', {"content":"message 0"})
  .query(true)
  .reply(201, {"id":"1643741856109"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages/1643741856109',
  'MS-CV',
  'WPuAq43eR0a3T0Z5rUfmOw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '190ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oIL5YQAAAAAB7z3q0kGAQaBuoGnOL5gNUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2/messages', {"content":"message 1"})
  .query(true)
  .reply(201, {"id":"1643741856357"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages/1643741856357',
  'MS-CV',
  'Hybd/n+C80udz1BrXBmotQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '169ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oIL5YQAAAAAha6oD5OHTR7wItwuvuZHYUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2/messages', {"content":"message 2"})
  .query(true)
  .reply(201, {"id":"1643741856584"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages/1643741856584',
  'MS-CV',
  '+m3sSl+rD0OtZ8uv/gaIkg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '202ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oIL5YQAAAAAjaEYKJdZaTbGWWHt1xibgUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643741856584","type":"text","sequenceId":"7","version":"1643741856584","content":{"message":"message 2"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},{"id":"1643741856357","type":"text","sequenceId":"6","version":"1643741856357","content":{"message":"message 1"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},{"id":"1643741856109","type":"text","sequenceId":"5","version":"1643741856109","content":{"message":"message 0"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},{"id":"1643741855269","type":"text","sequenceId":"4","version":"1643741855269","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:35Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}},"metadata":{"tags":"sometag"}},{"id":"1643741854847","type":"topicUpdated","sequenceId":"3","version":"1643741854847","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},"createdOn":"2022-02-01T18:57:34Z"},{"id":"1643741854348","type":"topicUpdated","sequenceId":"2","version":"1643741854348","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},"createdOn":"2022-02-01T18:57:34Z"},{"id":"1643741854293","type":"participantAdded","sequenceId":"1","version":"1643741854293","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd70-2c8a-08482200cb98","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd70-2c8a-08482200cb98"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},"createdOn":"2022-02-01T18:57:34Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '/klM/pj0gEuPhp6BeC0CoQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '146ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oIL5YQAAAAA5vOED0mf7SoHoGGFLdf0ZUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643741856584","type":"text","sequenceId":"7","version":"1643741856584","content":{"message":"message 2"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},{"id":"1643741856357","type":"text","sequenceId":"6","version":"1643741856357","content":{"message":"message 1"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}}],"nextLink":"https://chat-prod-e2e.communication.azure.com/chat/threads/19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages?syncState=3e3900000031393a677650657048367a30624f6a346f4c694a712d6776626e6757567a506a636b5471656c777455525335675931407468726561642e7632016542a6b67e0100004843a6b67e010000&startTime=1%2F1%2F1970%2012%3A00%3A00%20AM%20%2B00%3A00&maxPageSize=2&api-version=2021-09-07"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'CZKg3VbC4kqkuXwa6ctKbg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '95ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oIL5YQAAAAD2VyeWb3Z8TaswByV8QxPQUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643741856109","type":"text","sequenceId":"5","version":"1643741856109","content":{"message":"message 0"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},{"id":"1643741855269","type":"text","sequenceId":"4","version":"1643741855269","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T18:57:35Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}},"metadata":{"tags":"sometag"}}],"nextLink":"https://chat-prod-e2e.communication.azure.com/chat/threads/19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages?syncState=3e3900000031393a677650657048367a30624f6a346f4c694a712d6776626e6757567a506a636b5471656c777455525335675931407468726561642e763201253ea6b67e0100004843a6b67e010000&startTime=1%2F1%2F1970%2012%3A00%3A00%20AM%20%2B00%3A00&maxPageSize=2&api-version=2021-09-07"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'x4FWwVtsVUSN+ML9syMlIw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '115ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oYL5YQAAAABDh35CfpcRS6gIV46gCEomUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643741854847","type":"topicUpdated","sequenceId":"3","version":"1643741854847","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},"createdOn":"2022-02-01T18:57:34Z"},{"id":"1643741854348","type":"topicUpdated","sequenceId":"2","version":"1643741854348","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},"createdOn":"2022-02-01T18:57:34Z"}],"nextLink":"https://chat-prod-e2e.communication.azure.com/chat/threads/19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages?syncState=3e3900000031393a677650657048367a30624f6a346f4c694a712d6776626e6757567a506a636b5471656c777455525335675931407468726561642e7632018c3aa6b67e0100004843a6b67e010000&startTime=1%2F1%2F1970%2012%3A00%3A00%20AM%20%2B00%3A00&maxPageSize=2&api-version=2021-09-07"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'yJ2ZBMu0n0eDvjh6x7rZJw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '112ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oYL5YQAAAAAJCPzXL3H0QKZ9D3NZafioUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643741854293","type":"participantAdded","sequenceId":"1","version":"1643741854293","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd70-2c8a-08482200cb98","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd70-2c8a-08482200cb98"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},"createdOn":"2022-02-01T18:57:34Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'FsiCKMS9l0GEtjAWHgL9DQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '116ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oYL5YQAAAAA6g1LG7xRCR7a+VQngoZaiUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:36 GMT'
]);

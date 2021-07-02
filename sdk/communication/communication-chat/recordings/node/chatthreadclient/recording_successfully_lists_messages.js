let nock = require('nock');

module.exports.hash = "1f8534fbb5a951a66d210f9e8991c150";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1623705316364","type":"text","sequenceId":"4","version":"1623705316364","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-06-14T21:15:16Z","senderCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}},"metadata":{"tags":"sometag"}},{"id":"1623705315442","type":"topicUpdated","sequenceId":"3","version":"1623705315442","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}}},"createdOn":"2021-06-14T21:15:15Z"},{"id":"1623705313786","type":"topicUpdated","sequenceId":"2","version":"1623705313786","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}}},"createdOn":"2021-06-14T21:15:13Z"},{"id":"1623705313598","type":"participantAdded","sequenceId":"1","version":"1623705313598","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}}},"createdOn":"2021-06-14T21:15:13Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Vub52Ljv+0awkzXFioPOzQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '281ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05sbHYAAAAACp1pjW7kElSJs/Te8DoQCeUERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:18 GMT'
]);

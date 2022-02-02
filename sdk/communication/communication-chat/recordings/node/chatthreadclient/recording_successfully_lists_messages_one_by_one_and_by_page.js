let nock = require('nock');

module.exports.hash = "0f98320b1173fd0e91229459d02974bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3An_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643759961771","type":"text","sequenceId":"4","version":"1643759961771","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T23:59:21Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}},"metadata":{"tags":"sometag"}},{"id":"1643759961476","type":"topicUpdated","sequenceId":"3","version":"1643759961476","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}}},"createdOn":"2022-02-01T23:59:21Z"},{"id":"1643759961000","type":"topicUpdated","sequenceId":"2","version":"1643759961000","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}}},"createdOn":"2022-02-01T23:59:21Z"},{"id":"1643759960905","type":"participantAdded","sequenceId":"1","version":"1643759960905","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-2595-e3c7-593a0d00db93","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-2595-e3c7-593a0d00db93"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}}},"createdOn":"2022-02-01T23:59:20Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'eyp7seCGb0KHctnLVE+gDg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '102ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Wsn5YQAAAADaDixu3JnKRaP+5JklQ7kZUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3An_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643759961771","type":"text","sequenceId":"4","version":"1643759961771","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T23:59:21Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}},"metadata":{"tags":"sometag"}},{"id":"1643759961476","type":"topicUpdated","sequenceId":"3","version":"1643759961476","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}}},"createdOn":"2022-02-01T23:59:21Z"},{"id":"1643759961000","type":"topicUpdated","sequenceId":"2","version":"1643759961000","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}}},"createdOn":"2022-02-01T23:59:21Z"}],"nextLink":"https://chat-prod-e2e.communication.azure.com/chat/threads/19:n_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41@thread.v2/messages?syncState=3e3900000031393a6e5f483975496a4c716d524f6e61616b66316161636c715248544d3773636c59535476345f715f6737453431407468726561642e763201a883bab77e010000ab86bab77e010000&startTime=1%2F1%2F1970%2012%3A00%3A00%20AM%20%2B00%3A00&maxPageSize=3&api-version=2021-09-07"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'hwE76Mt55E+ZGfXbsvChiQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '95ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Wsn5YQAAAAAO/hR1EmEhR5gTZbFih/qFUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19:n_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41@thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643759960905","type":"participantAdded","sequenceId":"1","version":"1643759960905","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-2595-e3c7-593a0d00db93","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-2595-e3c7-593a0d00db93"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}}},"createdOn":"2022-02-01T23:59:20Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'k8yNkKxs0k6yd03UJs25jA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '141ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Wsn5YQAAAACwcpks+MBQRJm4/vSaxbW1UERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:22 GMT'
]);

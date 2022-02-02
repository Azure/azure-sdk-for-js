let nock = require('nock');

module.exports.hash = "3834d1c4cc3814113d869d38eaba2554";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3An_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41%40thread.v2/messages/1643759961771')
  .query(true)
  .reply(200, {"id":"1643759961771","type":"text","sequenceId":"4","version":"1643759961771","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T23:59:21Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-579c-253d-e3c7-593a0d00db92"}},"metadata":{"tags":"sometag"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'FjXZ7PMWc0WUdNpZw3vhzQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '89ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Wsn5YQAAAAAvhSZ77jEeQ5BL4Vln7WagUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:21 GMT'
]);

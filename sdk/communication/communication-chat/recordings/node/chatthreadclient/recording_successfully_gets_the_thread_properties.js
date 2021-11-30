let nock = require('nock');

module.exports.hash = "83c28f4ed758d8c7b92b56697f30ed8a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AGJhzTT5V5GxxOF-a6Z84_zITnb7xu-IRf-8431aqf8w1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:GJhzTT5V5GxxOF-a6Z84_zITnb7xu-IRf-8431aqf8w1@thread.v2","topic":"test topic","createdOn":"2021-09-03T19:27:17Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cec5-8e0e-454822000d95","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cec5-8e0e-454822000d95"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'V1+nZyH4/0eC1L1/smE8Ng.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6, 2021-09-07',
  'X-Processing-Time',
  '97ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FncyYQAAAAAZFvXMegUHTo/YaWqre9IyUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:17 GMT'
]);

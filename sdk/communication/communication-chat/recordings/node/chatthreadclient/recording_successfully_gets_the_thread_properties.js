let nock = require('nock');

module.exports.hash = "83c28f4ed758d8c7b92b56697f30ed8a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2","topic":"test topic","createdOn":"2022-02-01T18:57:34Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'fpTy1yBRGE+Qe4eSKEMhpA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '91ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0noL5YQAAAAAjLABmKTWdSp5BcovqcokGUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:34 GMT'
]);

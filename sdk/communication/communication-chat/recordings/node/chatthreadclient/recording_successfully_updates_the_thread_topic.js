let nock = require('nock');

module.exports.hash = "3d3dc8054a3ca3d6a9beb2d230dde270";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .patch('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2', { "topic": "new topic" })
  .query(true)
  .reply(204, "", [
    'MS-CV',
    'wgAChEKEWkS5zgaAtQKY7w.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '289ms',
    'X-Azure-Ref',
    '0MWU5YAAAAACRI0W+s1uDS6LJoIjD/Gt/WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
    'Date',
    'Fri, 26 Feb 2021 21:16:33 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2')
  .query(true)
  .reply(200, { "id": "19:78448d7234104d49a790bd99614da6e6@thread.v2", "topic": "new topic", "createdOn": "2021-02-26T21:16:32Z", "createdBy": "8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5" }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'EpJXNrYlPUyERiOJkST7vw.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '120ms',
    'X-Azure-Ref',
    '0MWU5YAAAAAA3n7sg5FckSKi5EB+oKAWPWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
    'Date',
    'Fri, 26 Feb 2021 21:16:33 GMT'
  ]);

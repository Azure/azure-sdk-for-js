let nock = require('nock');

module.exports.hash = "68f698ad1cd68fb5d2031b79d0a1fd0f";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/readReceipts')
  .query(true)
  .reply(200, { "value": [{ "senderId": "8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5", "chatMessageId": "1614374194140", "readOn": "2021-02-26T21:16:34Z" }] }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'OS3Z4I2mnUmBhWm9wJyEoQ.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '121ms',
    'X-Azure-Ref',
    '0NGU5YAAAAADrgjudhmLjRJ4hrJifPjIGWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
    'Date',
    'Fri, 26 Feb 2021 21:16:36 GMT'
  ]);

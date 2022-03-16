let nock = require('nock');

module.exports.hash = "296c960069ad9f22f6f93310713bf2d1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"name":"invalidRoutingTrunkRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["notExisting.fqdn.com"]}]})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"MissingTrunk","message":"Route targeting a missing trunk."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'PV6uQ+n+Ikiq4nMZQMFJsg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '378ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QtX6YgAAAADoh855lE6eT5yngz9QSLhAUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:22:42 GMT'
]);

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com","222.fqdn.com"]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '8HQH5OyUFUSfIYLpYgRuKA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '280ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Q9X6YgAAAAAwlej1mNXYRoQXojTurkNHUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:22:43 GMT'
]);

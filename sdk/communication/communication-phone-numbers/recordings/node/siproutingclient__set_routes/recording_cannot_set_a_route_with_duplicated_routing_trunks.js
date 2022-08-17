let nock = require('nock');

module.exports.hash = "18c9d186042ff7609897ee2a8e8e39aa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457},"111.fqdn.com":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '/aZIdjwqq0SmMDisJLJzBA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '206ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0E6MDYwAAAADAkozXKAqAQYcetMBE1N+FUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348},"11.fqdn.com":null,"22.fqdn.com":null,"33.fqdn.com":null}})
  .query(true)
  .reply(200, {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '7amjQM0fekeu3xt3QZp9CA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '1627ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FKMDYwAAAAAg0pDDDHP5TLyICW/EGQhXUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"name":"invalidDuplicatedRoutingTrunksRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com","111.fqdn.com"]}]})
  .query(true)
  .reply(400, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"RouteWithDuplicatedTrunk","message":"There is a duplicated trunk in a route."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  '/tild7YNrEaNNkRdsiFUbg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '24ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FqMDYwAAAACbMOmcYzRLQIYTDn2V8TzEUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5zHpuo3/lEG0X+I7p5x2zw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '206ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FqMDYwAAAACvUoEh0/UMT4Y4uuYR51DqUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:02 GMT'
]);

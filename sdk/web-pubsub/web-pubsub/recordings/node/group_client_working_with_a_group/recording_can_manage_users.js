let nock = require('nock');

module.exports.hash = "0d5b7d5c33cf6d52ec1243e93f8dbc04";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/ws/api/v1/hubs/simplechat/groups/group/users/brian')
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:55:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/ws/api/v1/hubs/simplechat/groups/group/users/brian')
  .reply(200, "", [
  'Date',
  'Mon, 11 May 2020 21:55:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/ws/api/v1/hubs/simplechat/groups/group/users/jeff')
  .reply(404, "", [
  'Date',
  'Mon, 11 May 2020 21:55:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/ws/api/v1/hubs/simplechat/groups/group/users/brian')
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:55:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/ws/api/v1/hubs/simplechat/groups/group/users/brian')
  .reply(404, "", [
  'Date',
  'Mon, 11 May 2020 21:55:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

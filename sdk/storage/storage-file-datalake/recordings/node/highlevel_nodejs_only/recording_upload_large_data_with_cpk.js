let nock = require('nock');

module.exports.hash = "f7fe99d7032941d9d5fad390dbf83f76";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164865660386008452","file":"file164865660536501277"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164865660386008452')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 16:10:05 GMT',
  'ETag',
  '"0x8DA1267C0F6947D"',
  'x-ms-request-id',
  '8700a39d-201e-0000-3b50-44e568000000',
  'x-ms-client-request-id',
  '1b3c5f7b-8467-4e21-bee0-18a1b74ae8b8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 16:10:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164865660386008452')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '8700a3a1-201e-0000-3c50-44e568000000',
  'x-ms-client-request-id',
  'e9429e26-a865-4c47-81c4-320640dab2f8',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 16:10:05 GMT'
]);

let nock = require('nock');

module.exports.hash = "ac1c1cdf0eab749a5fe0bdda95a511f0";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160715034623103290"},"newDate":{"now":"2020-12-05T06:39:07.659Z","tmr":"2020-12-05T06:39:07.661Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715034623103290')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 06:39:07 GMT',
  'ETag',
  '"0x8D898E87755EC4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26a30497-501e-00b6-5ad1-ca4b66000000',
  'x-ms-client-request-id',
  '0f240f7e-1d6d-438c-a410-29f33486c856',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:39:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160715034623103290')
  .query(true)
  .reply(200, {"paths":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6727389b-801f-001e-5fd1-ca9f73000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'fc81bd91-3ffe-428d-a48f-97938b4cc29c',
  'Date',
  'Sat, 05 Dec 2020 06:39:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160715034623103290')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26a30ac8-501e-00b6-54d1-ca4b66000000',
  'x-ms-client-request-id',
  'ffbcb0fe-ef8e-4aea-979f-555f24fb97d8',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:39:10 GMT'
]);

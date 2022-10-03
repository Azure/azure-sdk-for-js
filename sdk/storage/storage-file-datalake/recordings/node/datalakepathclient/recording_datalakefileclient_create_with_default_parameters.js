let nock = require('nock');

module.exports.hash = "b9068ee034ffe4f9f28afb2efa489809";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383019744400796","file":"file165383019772400267"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019744400796')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:16:37 GMT',
  'ETag',
  '"0x8DA417576659B8F"',
  'x-ms-request-id',
  '84b4a778-a01e-0003-155e-731608000000',
  'x-ms-client-request-id',
  '23a408e4-2b36-4d98-8437-e9dff18aecb3',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:37 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383019744400796/file165383019772400267')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:38 GMT',
  'ETag',
  '"0x8DA417577025385"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bc7-e01f-0007-7d5e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1bb313a6-d24d-4c23-9420-dae7ea2a12e3',
  'Date',
  'Sun, 29 May 2022 13:16:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019744400796/file165383019772400267', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '15533bc8-e01f-0007-7e5e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f72c7e0b-6b01-4bba-95b2-bd07ba6ede40',
  'Date',
  'Sun, 29 May 2022 13:16:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383019744400796/file165383019772400267')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:16:39 GMT',
  'ETag',
  '"0x8DA417577552367"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '15533bc9-e01f-0007-7f5e-73fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'baabaa26-6e6c-49d2-a723-e5d50592d3c5',
  'Date',
  'Sun, 29 May 2022 13:16:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383019744400796')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a77a-a01e-0003-165e-731608000000',
  'x-ms-client-request-id',
  'ea4ccc73-421c-414f-ab08-24a788c08abf',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:16:39 GMT'
]);

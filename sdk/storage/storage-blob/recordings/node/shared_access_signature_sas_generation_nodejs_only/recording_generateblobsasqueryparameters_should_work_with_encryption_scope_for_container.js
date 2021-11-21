let nock = require('nock');

module.exports.hash = "0c663bd14ee1ad6ce3e901940a4155ab";

module.exports.testInfo = {"uniqueName":{"container":"container163256897803505926","appendblob":"appendblob163256897931606698"},"newDate":{"now":"2021-09-25T11:22:58.034Z","tmr":"2021-09-25T11:22:58.035Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256897803505926')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:22:59 GMT',
  'ETag',
  '"0x8D98016D48C0185"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb15cd4-a01e-0012-22ff-b1a112000000',
  'x-ms-client-request-id',
  '822d203e-5138-400a-949a-06b433758211',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:22:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256897803505926/appendblob163256897931606698')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:22:59 GMT',
  'ETag',
  '"0x8D98016D4B92985"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb15d51-a01e-0012-09ff-b1a112000000',
  'x-ms-client-request-id',
  'f70a5e7d-2994-4ed5-a1ae-f3e31cad479c',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-25T11:22:59.6176261Z',
  'Date',
  'Sat, 25 Sep 2021 11:22:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256897803505926')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb15df9-a01e-0012-1cff-b1a112000000',
  'x-ms-client-request-id',
  'c6223823-7057-4fdc-9f6f-7617d492cd63',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:22:58 GMT'
]);

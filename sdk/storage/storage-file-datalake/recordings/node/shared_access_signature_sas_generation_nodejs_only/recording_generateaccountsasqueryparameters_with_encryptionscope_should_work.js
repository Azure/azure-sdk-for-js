let nock = require('nock');

module.exports.hash = "f8518529e36839be15c52a5fcc2e535f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940414955403221"},"newDate":{"tmr":"2022-08-02T01:35:49.551Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940414955403221')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:50 GMT',
  'ETag',
  '"0x8DA742754E9F4DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e980-601e-0034-7510-a6cac9000000',
  'x-ms-client-request-id',
  'a11be079-6cc4-47e0-bb08-bc3cd163b75b',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940414955403221')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e98f-601e-0034-0110-a6cac9000000',
  'x-ms-client-request-id',
  '4503ba17-baee-44be-b867-ee2d4bebf726',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:50 GMT'
]);

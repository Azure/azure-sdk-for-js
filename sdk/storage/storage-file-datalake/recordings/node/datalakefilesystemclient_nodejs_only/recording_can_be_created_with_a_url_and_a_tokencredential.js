let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534403200705328"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534403200705328')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:54 GMT',
  'ETag',
  '"0x8D777A0C8FD50EE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9737aac-301e-006a-5389-a91935000000',
  'x-ms-client-request-id',
  'a081af4b-68b7-494b-9784-e1dc6ab1c0c6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:54 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534403200705328')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9737bb3-301e-006a-3f89-a91935000000',
  'x-ms-client-request-id',
  '818942e0-86d9-48d9-b48f-2720b49a9107',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:54 GMT' ]);

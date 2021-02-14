let nock = require('nock');

module.exports.hash = "e5b376560681e35a445fcdd8f47cbcc2";

module.exports.testInfo = {"uniqueName":{"container":"container159210705459109851","blob":"blob159210705602705459"},"newDate":{"now":"2020-06-14T03:57:36.635Z","tmr":"2020-06-14T03:57:36.637Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210705459109851')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 03:57:35 GMT',
  'ETag',
  '"0x8D8101712C9AA6D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '953797a0-301e-006f-3aff-414753000000',
  'x-ms-client-request-id',
  '67c1db94-d434-4033-829b-107689909849',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 03:57:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210705459109851/blob159210705602705459', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 03:57:36 GMT',
  'ETag',
  '"0x8D81017130021C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '953798d9-301e-006f-63ff-414753000000',
  'x-ms-client-request-id',
  '39221734-24b0-49aa-96ce-94a2ca355d76',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T03:57:36.1993161Z',
  'Date',
  'Sun, 14 Jun 2020 03:57:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210705459109851/blob159210705602705459')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Jun 2020 03:57:36 GMT',
  'ETag',
  '"0x8D81017132D0644"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '953799e2-301e-006f-67ff-414753000000',
  'x-ms-client-request-id',
  'fd4f5910-6c55-4f59-b161-0d44ae0f5450',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T03:57:36.4945236Z',
  'Date',
  'Sun, 14 Jun 2020 03:57:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210705459109851/blob159210705602705459', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95379b4f-301e-006f-45ff-414753000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '15440dca-2a15-42e9-8ae0-75af905031ab',
  'Date',
  'Sun, 14 Jun 2020 03:57:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210705459109851/blob159210705602705459')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95379d35-301e-006f-17ff-414753000000',
  'x-ms-client-request-id',
  'a9a604d2-58bb-40b2-938d-4f7081f3a738',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sun, 14 Jun 2020 03:57:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210705459109851/blob159210705602705459')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95379e8f-301e-006f-68ff-414753000000',
  'x-ms-client-request-id',
  'a01373bf-d2d5-4f57-976e-8be92e88be63',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Date',
  'Sun, 14 Jun 2020 03:57:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210705459109851')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95379fb9-301e-006f-0dff-414753000000',
  'x-ms-client-request-id',
  '5af846bc-081d-4fa3-af59-005fa7768f31',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 03:57:37 GMT'
]);

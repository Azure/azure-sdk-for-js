let nock = require('nock');

module.exports.hash = "1ccf9a2f68bfc891ee2ab8849719e9a9";

module.exports.testInfo = {"uniqueName":{"share":"share164421961806004508","sourcefile":"sourcefile164421961966300596","destfile":"destfile164421961997702762"},"newDate":{"tmr":"2022-02-07T07:40:19.662Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421961806004508')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:19 GMT',
  'ETag',
  '"0x8D9EA0D17576A0D"',
  'x-ms-request-id',
  '1da7150f-a01a-0003-68f5-1b1608000000',
  'x-ms-client-request-id',
  '9f4007c5-9bc6-4381-b4f4-6712d3870abc',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Mon, 07 Feb 2022 07:40:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421961806004508/sourcefile164421961966300596')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:20 GMT',
  'ETag',
  '"0x8D9EA0D178A2FF5"',
  'x-ms-request-id',
  '1da71512-a01a-0003-69f5-1b1608000000',
  'x-ms-client-request-id',
  '1623ade7-ffc4-4fe6-9d38-605f34295fd6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T07:40:20.0042485Z',
  'x-ms-file-last-write-time',
  '2022-02-07T07:40:20.0042485Z',
  'x-ms-file-creation-time',
  '2022-02-07T07:40:20.0042485Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 07:40:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421961806004508/destfile164421961997702762')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:20 GMT',
  'ETag',
  '"0x8D9EA0D17B2C6DC"',
  'x-ms-request-id',
  '1da71514-a01a-0003-6af5-1b1608000000',
  'x-ms-client-request-id',
  '1672c425-9795-48fb-bc6d-e6e7d29db9c6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T07:40:20.2702556Z',
  'x-ms-file-last-write-time',
  '2022-02-07T07:40:20.2702556Z',
  'x-ms-file-creation-time',
  '2022-02-07T07:40:20.2702556Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 07:40:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164421961806004508/destfile164421961997702762')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 07 Feb 2022 07:40:20 GMT',
  'ETag',
  '"0x8D9EA0D17F01E3A"',
  'x-ms-request-id',
  '1da71515-a01a-0003-6bf5-1b1608000000',
  'x-ms-client-request-id',
  'f504326c-5499-4110-9093-7efe61b0ae5a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2022-02-07T07:40:20.6722618Z',
  'x-ms-file-last-write-time',
  '2022-02-07T07:40:20.0042485Z',
  'x-ms-file-creation-time',
  '2022-02-07T07:40:20.0042485Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 07 Feb 2022 07:40:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164421961806004508/sourcefile164421961966300596')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1da71516-a01a-0003-6cf5-1b1608000000',
  'x-ms-client-request-id',
  '190766fb-b4e1-4c97-b149-f774ab81a4ac',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 07 Feb 2022 07:40:21 GMT'
]);

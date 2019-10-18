let nock = require('nock');

module.exports.testInfo = {"share":"share156816843033409316"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816843033409316x0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:30 GMT',
  'ETag',
  '"0x8D7365E9E4CCA38"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9f1df26-101a-000f-7847-688b0a000000',
  'x-ms-client-request-id',
  'f794841a-5239-4799-9558-10bf82e3f62f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:30 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816843033409316x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:31 GMT',
  'ETag',
  '"0x8D7365E9E8D130E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8c4b1f2-b01a-004d-1547-68a01e000000',
  'x-ms-client-request-id',
  '0329dbf2-159d-40cf-99eb-8761444edb62',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:30 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816843033409316x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:31 GMT',
  'ETag',
  '"0x8D7365E9ED7C257"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85a43dc-301a-0018-0347-684b69000000',
  'x-ms-client-request-id',
  '6ab16ae2-0664-40dc-8054-1c025072c202',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:31 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816843033409316x3')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:32 GMT',
  'ETag',
  '"0x8D7365E9F19EE4A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18b2d62c-c01a-0006-2647-689184000000',
  'x-ms-client-request-id',
  '0a736fb8-9d91-47ba-a1a9-18e180cecd63',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:31 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816843033409316</Prefix><MaxResults>2</MaxResults><Shares><Share><Name>share156816843033409316x0</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:30 GMT</Last-Modified><Etag>\"0x8D7365E9E4CCA38\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156816843033409316x1</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:31 GMT</Last-Modified><Etag>\"0x8D7365E9E8D130E\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156816843033409316x2/01D568477C62341F/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a944695-201a-002e-5c47-68e63b000000',
  'x-ms-client-request-id',
  '8a0c3c34-92b6-449d-a935-83c261b7587e',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:32 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816843033409316</Prefix><Marker>/fakestorageaccount/share156816843033409316x2/01D568477C62341F/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>2</MaxResults><Shares><Share><Name>share156816843033409316x2</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:31 GMT</Last-Modified><Etag>\"0x8D7365E9ED7C257\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156816843033409316x3</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:32 GMT</Last-Modified><Etag>\"0x8D7365E9F19EE4A\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6b98b1-a01a-0052-4e47-687b0e000000',
  'x-ms-client-request-id',
  '5cf7c389-4293-44be-b64e-bff0c78609a5',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:32 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816843033409316x0')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cefd3563-a01a-003f-5f47-68d120000000',
  'x-ms-client-request-id',
  '75a701a0-e535-4f60-aa1a-662cd4c1ea10',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:32 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816843033409316x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79770b37-c01a-006b-4b47-683baa000000',
  'x-ms-client-request-id',
  '6e37b8a2-7708-423a-9f67-1a6d01e6c587',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:32 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816843033409316x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '252c67ea-d01a-0019-6647-684a94000000',
  'x-ms-client-request-id',
  'd9ba5108-bca7-47c5-abf2-362fb9b3ff7f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816843033409316x3')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ae131f7-201a-0043-5e47-684c15000000',
  'x-ms-client-request-id',
  '9a648303-2704-4e40-bf84-423a19edf667',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:33 GMT' ]);


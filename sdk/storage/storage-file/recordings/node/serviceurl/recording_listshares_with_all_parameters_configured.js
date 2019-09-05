let nock = require('nock');

module.exports.testInfo = {"share":"share156767544408504122"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767544408504122x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:04 GMT',
  'ETag',
  '"0x8D731E2CB8A9D94"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ce51fa6-a01a-0023-5ecb-636d40000000',
  'x-ms-client-request-id',
  '5a306e03-14ec-4a7f-b3a1-267598f0fee8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767544408504122x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:04 GMT',
  'ETag',
  '"0x8D731E2CBCA8204"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '13b74caa-301a-013e-57cb-639ef1000000',
  'x-ms-client-request-id',
  '2287ce73-1f28-4783-a34f-0f9ad5dfac5d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156767544408504122</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share156767544408504122x1</Name><Properties><Last-Modified>Thu, 05 Sep 2019 09:24:04 GMT</Last-Modified><Etag>\"0x8D731E2CB8A9D94\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156767544408504122x2/01D563CBA95460CE/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5dcae849-701a-00b6-01cb-6385f5000000',
  'x-ms-client-request-id',
  '54a57def-826e-420f-bbea-f179fa71d487',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:24:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156767544408504122</Prefix><Marker>/fakestorageaccount/share156767544408504122x2/01D563CBA95460CE/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share156767544408504122x2</Name><Properties><Last-Modified>Thu, 05 Sep 2019 09:24:04 GMT</Last-Modified><Etag>\"0x8D731E2CBCA8204\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c783d287-201a-005f-6fcb-6343bf000000',
  'x-ms-client-request-id',
  'bfc215a4-f2d1-4e3a-8152-35535435da4c',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:24:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767544408504122x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc861902-301a-006c-01cb-631c14000000',
  'x-ms-client-request-id',
  '3b37990b-5198-4abe-a8ca-2836e1aa1904',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767544408504122x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5805b78e-501a-0008-0ecb-63ed8c000000',
  'x-ms-client-request-id',
  '1d9ebdb7-a8e4-4927-b415-5cf8c8910e15',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:05 GMT',
  'Connection',
  'close' ]);


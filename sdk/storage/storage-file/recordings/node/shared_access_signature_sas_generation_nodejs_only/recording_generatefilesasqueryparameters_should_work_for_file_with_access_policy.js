let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-11T02:22:21.301Z","share":"share156816854130109051","dir":"dir156816854179102705","file":"file156816854220004597"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816854130109051')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:21 GMT',
  'ETag',
  '"0x8D7365EE079B688"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '333d7cd4-501a-0003-5d47-6865fb000000',
  'x-ms-client-request-id',
  '213481ed-60e1-42d4-810f-19505a736c35',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:20 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816854130109051/dir156816854179102705')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:22 GMT',
  'ETag',
  '"0x8D7365EE0B96BF1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddf4b3ea-701a-003d-5347-68d3da000000',
  'x-ms-client-request-id',
  '039fb7d9-9b18-4ddd-b848-e40ec7d03f1e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:22:22.1288433Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:22:22.1288433Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:22:22.1288433Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:22:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816854130109051/dir156816854179102705/file156816854220004597')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:22 GMT',
  'ETag',
  '"0x8D7365EE0F82E0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f431eb2e-201a-006a-1247-683a57000000',
  'x-ms-client-request-id',
  '8c90a54f-fab8-4825-8e1f-385b06b8651b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:22:22.5401359Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:22:22.5401359Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:22:22.5401359Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:22:22 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816854130109051', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-11T02:17:21.3010000Z</Start><Expiry>2019-09-12T02:22:21.3010000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:23 GMT',
  'ETag',
  '"0x8D7365EE142856D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bee1e17d-201a-0061-6947-682223000000',
  'x-ms-client-request-id',
  '7993fe52-65d7-45a7-9ad6-1999dcf05f16',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:22 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816854130109051/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816854130109051\" DirectoryPath=\"\"><Entries><Directory><Name>dir156816854179102705</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7fbe3d99-301a-003a-0647-68255f000000',
  'x-ms-client-request-id',
  '0610ec07-67aa-4825-86ac-cc1779fd38d8',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816854130109051')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bee1e17e-201a-0061-6a47-682223000000',
  'x-ms-client-request-id',
  '354bbd2c-4832-42da-be21-0bfeab5aabe3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:23 GMT' ]);


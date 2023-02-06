let nock = require('nock');

module.exports.hash = "92047cee93d29add57ac952974071c20";

module.exports.testInfo = {"uniqueName":{"share":"share167569224623704808","dir":"dir167569224680600559","dir￾":"dir￾167569224683404257","dir￾0":"dir￾0167569224685102864","dir￾1":"dir￾1167569224686508907","dir￾2":"dir￾2167569224687908739","file￾0":"file￾0167569224689300993","file￾1":"file￾1167569224690703211","file￾2":"file￾2167569224692105512"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B02F06EA7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329b2-301a-0006-6f33-3a7a33000000',
  'x-ms-client-request-id',
  'a9b9c9f6-906e-4447-9e04-09527605acb7',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir167569224680600559')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B02F6FB73"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329d0-301a-0006-0833-3a7a33000000',
  'x-ms-client-request-id',
  '9c5a45e6-7f3c-4502-87e9-45d67b4f8afe',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.8367219Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.8367219Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.8367219Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B02FA2F4A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329d4-301a-0006-0b33-3a7a33000000',
  'x-ms-client-request-id',
  '9e30e8d9-c35c-48bc-a7b5-1728edaa6af7',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.8577098Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.8577098Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.8577098Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257/dir%EF%BF%BE0167569224685102864')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B02FC2AD8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329d6-301a-0006-0d33-3a7a33000000',
  'x-ms-client-request-id',
  '7cf950f6-2978-4040-abf3-375b2ae35097',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.8707032Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.8707032Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.8707032Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257/dir%EF%BF%BE1167569224686508907')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B02FE4D6C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329d7-301a-0006-0e33-3a7a33000000',
  'x-ms-client-request-id',
  '9b816e37-547b-43b3-862d-6eb724dded01',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.8846956Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.8846956Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.8846956Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257/dir%EF%BF%BE2167569224687908739')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B030048F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329d8-301a-0006-0f33-3a7a33000000',
  'x-ms-client-request-id',
  'bd7afc91-b053-4b1b-ad0a-0880d85fc614',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.8976886Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.8976886Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.8976886Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '14988049928633188352',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257/file%EF%BF%BE0167569224689300993')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B0302B9A4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329db-301a-0006-1233-3a7a33000000',
  'x-ms-client-request-id',
  '6f6a1f49-7e5e-4b90-8e9d-15c89373f113',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.9136804Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.9136804Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.9136804Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '12682206919419494400',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257/file%EF%BF%BE1167569224690703211')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B0304DC34"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329dc-301a-0006-1333-3a7a33000000',
  'x-ms-client-request-id',
  '2acbbf79-85e2-4d9b-8721-ccf2ef39aea2',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.9276724Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.9276724Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.9276724Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '17293892937846882304',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569224623704808/dir%EF%BF%BE167569224683404257/file%EF%BF%BE2167569224692105512')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 14:04:06 GMT',
  'ETag',
  '"0x8DB084B0306FECB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329df-301a-0006-1633-3a7a33000000',
  'x-ms-client-request-id',
  'c289d77c-5fda-486f-b9ca-4acbcbcc7212',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T14:04:06.9416651Z',
  'x-ms-file-last-write-time',
  '2023-02-06T14:04:06.9416651Z',
  'x-ms-file-creation-time',
  '2023-02-06T14:04:06.9416651Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '9799903157902376960',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167569224623704808/dir%EF%BF%BE167569224683404257')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167569224623704808\" Encoded=\"true\" DirectoryPath=\"dir%EF%BF%BE167569224683404257\"><DirectoryId>11529285414812647424</DirectoryId><Entries><Directory><Name Encoded=\"true\">dir%EF%BF%BE0167569224685102864</Name><FileId>16140971433240035328</FileId><Properties><CreationTime>2023-02-06T14:04:06.8707032Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.8707032Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.8707032Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.8707032Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B02FC2AD8\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><Directory><Name Encoded=\"true\">dir%EF%BF%BE1167569224686508907</Name><FileId>10376363910205800448</FileId><Properties><CreationTime>2023-02-06T14:04:06.8846956Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.8846956Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.8846956Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.8846956Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B02FE4D6C\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><Directory><Name Encoded=\"true\">dir%EF%BF%BE2167569224687908739</Name><FileId>14988049928633188352</FileId><Properties><CreationTime>2023-02-06T14:04:06.8976886Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.8976886Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.8976886Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.8976886Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B030048F6\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><File><Name Encoded=\"true\">file%EF%BF%BE0167569224689300993</Name><FileId>12682206919419494400</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T14:04:06.9136804Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.9136804Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.9136804Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.9136804Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B0302B9A4\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File><File><Name Encoded=\"true\">file%EF%BF%BE1167569224690703211</Name><FileId>17293892937846882304</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T14:04:06.9276724Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.9276724Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.9276724Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.9276724Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B0304DC34\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File><File><Name Encoded=\"true\">file%EF%BF%BE2167569224692105512</Name><FileId>9799903157902376960</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T14:04:06.9416651Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.9416651Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.9416651Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.9416651Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B0306FECB\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329e0-301a-0006-1733-3a7a33000000',
  'x-ms-client-request-id',
  'fb4d9a65-42e7-4ec5-af3c-603778539106',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167569224623704808/dir%EF%BF%BE167569224683404257')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167569224623704808\" Encoded=\"true\" DirectoryPath=\"dir%EF%BF%BE167569224683404257\"><Prefix Encoded=\"true\">dir%EF%BF%BE</Prefix><DirectoryId>11529285414812647424</DirectoryId><Entries><Directory><Name Encoded=\"true\">dir%EF%BF%BE0167569224685102864</Name><FileId>16140971433240035328</FileId><Properties><CreationTime>2023-02-06T14:04:06.8707032Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.8707032Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.8707032Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.8707032Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B02FC2AD8\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><Directory><Name Encoded=\"true\">dir%EF%BF%BE1167569224686508907</Name><FileId>10376363910205800448</FileId><Properties><CreationTime>2023-02-06T14:04:06.8846956Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.8846956Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.8846956Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.8846956Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B02FE4D6C\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory><Directory><Name Encoded=\"true\">dir%EF%BF%BE2167569224687908739</Name><FileId>14988049928633188352</FileId><Properties><CreationTime>2023-02-06T14:04:06.8976886Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.8976886Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.8976886Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.8976886Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B030048F6\"</Etag></Properties><Attributes>Directory</Attributes><PermissionKey>9212185477508673717*1658283376881248060</PermissionKey></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329e4-301a-0006-1b33-3a7a33000000',
  'x-ms-client-request-id',
  '8d7e8669-da21-49f9-a9f1-7dda9a89085a',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167569224623704808/dir%EF%BF%BE167569224683404257')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167569224623704808\" Encoded=\"true\" DirectoryPath=\"dir%EF%BF%BE167569224683404257\"><Prefix Encoded=\"true\">file%EF%BF%BE</Prefix><DirectoryId>11529285414812647424</DirectoryId><Entries><File><Name Encoded=\"true\">file%EF%BF%BE0167569224689300993</Name><FileId>12682206919419494400</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T14:04:06.9136804Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.9136804Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.9136804Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.9136804Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B0302B9A4\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File><File><Name Encoded=\"true\">file%EF%BF%BE1167569224690703211</Name><FileId>17293892937846882304</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T14:04:06.9276724Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.9276724Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.9276724Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.9276724Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B0304DC34\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File><File><Name Encoded=\"true\">file%EF%BF%BE2167569224692105512</Name><FileId>9799903157902376960</FileId><Properties><Content-Length>1024</Content-Length><CreationTime>2023-02-06T14:04:06.9416651Z</CreationTime><LastAccessTime>2023-02-06T14:04:06.9416651Z</LastAccessTime><LastWriteTime>2023-02-06T14:04:06.9416651Z</LastWriteTime><ChangeTime>2023-02-06T14:04:06.9416651Z</ChangeTime><Last-Modified>Mon, 06 Feb 2023 14:04:06 GMT</Last-Modified><Etag>\"0x8DB084B0306FECB\"</Etag></Properties><Attributes>Archive</Attributes><PermissionKey>13809038870468939698*1658283376881248060</PermissionKey></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329e6-301a-0006-1d33-3a7a33000000',
  'x-ms-client-request-id',
  '8fec8bf2-f6b2-4e1f-b7da-2d5f81883f58',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257/file%EF%BF%BE0167569224689300993')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329e7-301a-0006-1e33-3a7a33000000',
  'x-ms-client-request-id',
  'a952686b-fc64-419b-92a8-5778a89755f8',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257/file%EF%BF%BE1167569224690703211')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329e8-301a-0006-1f33-3a7a33000000',
  'x-ms-client-request-id',
  '19539a19-1a67-40b7-8626-b9bd5d15671c',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257/file%EF%BF%BE2167569224692105512')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329e9-301a-0006-2033-3a7a33000000',
  'x-ms-client-request-id',
  '9abc0e9b-8fc8-4f42-8d59-bfc7f8099d70',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257/dir%EF%BF%BE0167569224685102864')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329eb-301a-0006-2233-3a7a33000000',
  'x-ms-client-request-id',
  '8705cfcf-a154-43e9-899f-92db0446f39d',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257/dir%EF%BF%BE1167569224686508907')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329ec-301a-0006-2333-3a7a33000000',
  'x-ms-client-request-id',
  'c8aab6ba-fcf1-4e10-ac55-d68a273eedf9',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257/dir%EF%BF%BE2167569224687908739')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329ed-301a-0006-2433-3a7a33000000',
  'x-ms-client-request-id',
  '1710c029-1d48-402f-b0eb-6092ad36d025',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808/dir%EF%BF%BE167569224683404257')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05329ef-301a-0006-2633-3a7a33000000',
  'x-ms-client-request-id',
  '9d15eef4-0fbe-4a66-b232-afb8373737ee',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569224623704808')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41caf96e-001a-0063-1d33-3acb6e000000',
  'x-ms-client-request-id',
  'd66f5e43-2c4f-4a51-951e-4f8922e6fafd',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 14:04:06 GMT'
]);

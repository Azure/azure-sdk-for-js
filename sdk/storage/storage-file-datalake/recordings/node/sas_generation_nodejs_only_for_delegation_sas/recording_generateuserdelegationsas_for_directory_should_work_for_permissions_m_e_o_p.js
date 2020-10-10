let nock = require('nock');

module.exports.hash = "c632b8f565a1f09ddd0d399c60fc04aa";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119116256900728","directory":"directory160119116309402910","file":"file160119116449005138"},"newDate":{"now":"2020-09-27T07:19:21.139Z","tmr":"2020-09-27T07:19:21.140Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-09-27T06:19:21Z</Start><Expiry>2020-10-02T07:19:21Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-09-27T06:19:21Z</SignedStart><SignedExpiry>2020-10-02T07:19:21Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>l4kTXsRyr0o+LQCeJFCYgeIHfdbKrPqfwDeQzdtzjtw=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01da158f-b01e-0095-069e-94a515000000',
  'x-ms-client-request-id',
  '37bb5e48-dd76-4402-b71a-19ef6c02c364',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:19:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119116256900728')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 07:19:22 GMT',
  'ETag',
  '"0x8D862B5A87340F9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01da15ac-b01e-0095-1b9e-94a515000000',
  'x-ms-client-request-id',
  '0922c281-181c-460c-9a85-9df62e3479c5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:19:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119116256900728/directory160119116309402910')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:19:24 GMT',
  'ETag',
  '"0x8D862B5A965E89F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6168ec27-901f-0082-239e-940c1e000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '9b4b8f35-60d0-45ad-837b-424cf18e27fc',
  'Date',
  'Sun, 27 Sep 2020 07:19:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119116256900728/directory160119116309402910/file160119116449005138')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:19:24 GMT',
  'ETag',
  '"0x8D862B5A9950CAE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6168ec33-901f-0082-2e9e-940c1e000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f8dbc4ca-1d77-466f-bf4b-49de6aec966e',
  'Date',
  'Sun, 27 Sep 2020 07:19:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160119116256900728/directory160119116309402910')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:19:24 GMT',
  'ETag',
  '"0x8D862B5A965E89F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '1ce13278-a083-4d15-8796-de39717793e1',
  'x-ms-group',
  '1ce13278-a083-4d15-8796-de39717793e1',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '6168ec34-901f-0082-2f9e-940c1e000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'c253ee46-9f26-450a-bb48-0b3b7958fdf0',
  'Date',
  'Sun, 27 Sep 2020 07:19:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119116256900728/directory160119116309402910')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:19:24 GMT',
  'ETag',
  '"0x8D862B5A965E89F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '549fca7e-301f-0040-509e-944a98000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'dff76112-3a80-46cf-81b6-973d7d21ddb1',
  'Date',
  'Sun, 27 Sep 2020 07:19:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119116256900728')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01da173b-b01e-0095-389e-94a515000000',
  'x-ms-client-request-id',
  '63894e3c-0bd7-4be0-ab5a-37b4b4ea38c4',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:19:25 GMT'
]);

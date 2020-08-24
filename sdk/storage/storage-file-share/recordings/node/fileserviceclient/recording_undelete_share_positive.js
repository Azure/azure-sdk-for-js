let nock = require('nock');

module.exports.hash = "4a7b841e0c16d29e1c18c43322517b0f";

module.exports.testInfo = {"uniqueName":{"share":"share159825307239402267"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159825307239402267')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 07:11:12 GMT',
  'ETag',
  '"0x8D847FCE21A9E41"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a81a-001a-003d-7be5-794162000000',
  'x-ms-client-request-id',
  '7daeae81-9faf-41d6-9601-a131f33ba0e1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 07:11:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159825307239402267')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a81c-001a-003d-7ce5-794162000000',
  'x-ms-client-request-id',
  '886e9c77-5255-4ac4-bced-a73090665887',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 07:11:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Shares><Share><Name>share159825189673103060</Name><Deleted>true</Deleted><Version>01D679E3034BB8D1</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:37 GMT</Last-Modified><Etag>\"0x8D847FA25C224E5\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:37 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825189828205497</Name><Deleted>true</Deleted><Version>01D679E303D09169</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:38 GMT</Last-Modified><Etag>\"0x8D847FA2646D62A\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:38 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:38 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199096905489</Name><Deleted>true</Deleted><Version>01D679E33B709913</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:11 GMT</Last-Modified><Etag>\"0x8D847FA5DE6DED2\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199207004582</Name><Deleted>true</Deleted><Version>01D679E34DF7F760</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:42 GMT</Last-Modified><Etag>\"0x8D847FA706E42BE\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:42 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825307112909052</Name><Deleted>true</Deleted><Version>01D679E5BF481A98</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:11 GMT</Last-Modified><Etag>\"0x8D847FCE1BF272C\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825307239402267</Name><Deleted>true</Deleted><Version>01D679E5BFA391B7</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:12 GMT</Last-Modified><Etag>\"0x8D847FCE21A9E41\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:12 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share></Shares><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a81d-001a-003d-7de5-794162000000',
  'x-ms-client-request-id',
  'f33f37a9-b0b5-49a1-8023-7731dc069261',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 07:11:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159825307239402267')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 07:11:43 GMT',
  'ETag',
  '"0x8D847FCF4625F32"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a84b-001a-003d-0ee5-794162000000',
  'x-ms-client-request-id',
  '1397a997-7086-4ae6-828d-c41385c7071b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 07:11:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share159825307239402267')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 07:11:43 GMT',
  'ETag',
  '"0x8D847FCF4625F32"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a84e-001a-003d-0fe5-794162000000',
  'x-ms-client-request-id',
  'ecbdb0ae-de95-4ce0-ba19-916f0d7dd2df',
  'x-ms-version',
  '2019-12-12',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  '8/24/2020 7:11:12 AM',
  'Date',
  'Mon, 24 Aug 2020 07:11:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159825307239402267')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a850-001a-003d-10e5-794162000000',
  'x-ms-client-request-id',
  '04219254-de1c-43a0-b376-2d4c1ffe797a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 07:11:42 GMT'
]);

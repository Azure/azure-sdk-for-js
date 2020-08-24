let nock = require('nock');

module.exports.hash = "4a7b841e0c16d29e1c18c43322517b0f";

module.exports.testInfo = {"uniqueName":{"share":"share159826355026209920"},"newDate":{}}

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159826355026209920')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 10:05:50 GMT',
  'ETag',
  '"0x8D84815476D626A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdb9-601a-002b-6cfe-79b7b5000000',
  'x-ms-client-request-id',
  '37e5f994-ec4e-4b6c-aa4c-50f711b08812',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 10:05:49 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159826355026209920')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdbb-601a-002b-6dfe-79b7b5000000',
  'x-ms-client-request-id',
  'c49cefec-5478-4bcb-9857-c42ad0128b94',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 10:05:49 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://sd-fakestorageaccount.file.core.windows.net/\"><Shares><Share><Name>share159825189673103060</Name><Deleted>true</Deleted><Version>01D679E3034BB8D1</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:37 GMT</Last-Modified><Etag>\"0x8D847FA25C224E5\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:37 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825189828205497</Name><Deleted>true</Deleted><Version>01D679E303D09169</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:38 GMT</Last-Modified><Etag>\"0x8D847FA2646D62A\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:38 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:38 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825199096905489</Name><Deleted>true</Deleted><Version>01D679E33B709913</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:11 GMT</Last-Modified><Etag>\"0x8D847FA5DE6DED2\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:11 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825199207004582</Name><Deleted>true</Deleted><Version>01D679E34DF7F760</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:42 GMT</Last-Modified><Etag>\"0x8D847FA706E42BE\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:42 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825307112909052</Name><Deleted>true</Deleted><Version>01D679E5BF481A98</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:11 GMT</Last-Modified><Etag>\"0x8D847FCE1BF272C\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:11 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825307239402267</Name><Deleted>true</Deleted><Version>01D679E5D1EBDFA5</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:43 GMT</Last-Modified><Etag>\"0x8D847FCF4625F32\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:43 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825381151004315</Name><Deleted>true</Deleted><Version>01D679E7788E6446</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:23:32 GMT</Last-Modified><Etag>\"0x8D847FE9B048382\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:23:32 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:23:32 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825381303905081</Name><Deleted>true</Deleted><Version>01D679E78BE0A71E</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:24:04 GMT</Last-Modified><Etag>\"0x8D847FEAE56F898\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:23:33 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:24:05 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826090773805897</Name><Deleted>true</Deleted><Version>01D679F7FE4A39BC</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:21:48 GMT</Last-Modified><Etag>\"0x8D8480F20C11941\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:21:48 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:21:48 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826160495503085</Name><Deleted>true</Deleted><Version>01D679F99DE8CE7E</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:33:25 GMT</Last-Modified><Etag>\"0x8D84810C05F782D\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:33:25 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:33:25 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826167603602576</Name><Deleted>true</Deleted><Version>01D679F9C84046E0</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:34:36 GMT</Last-Modified><Etag>\"0x8D84810EAB6F56A\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:34:36 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:34:36 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826167734201983</Name><Deleted>true</Deleted><Version>01D679F9DADE16AE</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:35:07 GMT</Last-Modified><Etag>\"0x8D84810FD54F378\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:34:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:35:08 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826339042304688</Name><Deleted>true</Deleted><Version>01D679FDC615F3A8</Version><Properties><Last-Modified>Mon, 24 Aug 2020 10:03:11 GMT</Last-Modified><Etag>\"0x8D84814E88C84F7\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 10:03:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 10:03:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159826354901006641</Name><Deleted>true</Deleted><Version>01D679FE2497F4DF</Version><Properties><Last-Modified>Mon, 24 Aug 2020 10:05:49 GMT</Last-Modified><Etag>\"0x8D84815470F048D\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 10:05:49 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 10:05:49 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159826355026209920</Name><Deleted>true</Deleted><Version>01D679FE24F652B4</Version><Properties><Last-Modified>Mon, 24 Aug 2020 10:05:50 GMT</Last-Modified><Etag>\"0x8D84815476D626A\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 10:05:50 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 10:05:50 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share></Shares><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdbc-601a-002b-6efe-79b7b5000000',
  'x-ms-client-request-id',
  '7e219844-2fbe-44cf-90c6-d9306b30a03c',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 10:05:49 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159826355026209920')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 10:06:20 GMT',
  'ETag',
  '"0x8D8481559AC206B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effded-601a-002b-79fe-79b7b5000000',
  'x-ms-client-request-id',
  'beaaf520-9adb-4db8-9b2e-cbfd1bb7818a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 10:06:20 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share159826355026209920')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 10:06:20 GMT',
  'ETag',
  '"0x8D8481559AC206B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdf0-601a-002b-7afe-79b7b5000000',
  'x-ms-client-request-id',
  '3a76b9d9-f629-4dcd-9c21-4b32592f6a49',
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
  '8/24/2020 10:05:50 AM',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 10:06:20 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159826355026209920')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdf1-601a-002b-7bfe-79b7b5000000',
  'x-ms-client-request-id',
  'a9dc883c-1dc0-4185-83df-95e4438bab61',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 10:06:20 GMT'
]);

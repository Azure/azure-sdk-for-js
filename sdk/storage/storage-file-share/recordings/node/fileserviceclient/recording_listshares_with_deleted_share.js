let nock = require('nock');

module.exports.hash = "5248ed1f4a9c837cfd493f79ed29e17a";

module.exports.testInfo = {"uniqueName":{"share":"share159826354901006641"},"newDate":{}}

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159826354901006641')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 10:05:49 GMT',
  'ETag',
  '"0x8D84815470F048D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdb4-601a-002b-69fe-79b7b5000000',
  'x-ms-client-request-id',
  '503625d9-325c-4224-b8af-d72c7c338466',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 10:05:48 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159826354901006641')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdb7-601a-002b-6afe-79b7b5000000',
  'x-ms-client-request-id',
  '3ad53619-4166-4c03-927d-09d423ce7c1e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 10:05:49 GMT'
]);

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://sd-fakestorageaccount.file.core.windows.net/\"><Shares><Share><Name>share159825189673103060</Name><Deleted>true</Deleted><Version>01D679E3034BB8D1</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:37 GMT</Last-Modified><Etag>\"0x8D847FA25C224E5\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:37 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825189828205497</Name><Deleted>true</Deleted><Version>01D679E303D09169</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:38 GMT</Last-Modified><Etag>\"0x8D847FA2646D62A\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:38 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:38 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825199096905489</Name><Deleted>true</Deleted><Version>01D679E33B709913</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:11 GMT</Last-Modified><Etag>\"0x8D847FA5DE6DED2\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:11 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825199207004582</Name><Deleted>true</Deleted><Version>01D679E34DF7F760</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:42 GMT</Last-Modified><Etag>\"0x8D847FA706E42BE\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:42 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825307112909052</Name><Deleted>true</Deleted><Version>01D679E5BF481A98</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:11 GMT</Last-Modified><Etag>\"0x8D847FCE1BF272C\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:11 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825307239402267</Name><Deleted>true</Deleted><Version>01D679E5D1EBDFA5</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:43 GMT</Last-Modified><Etag>\"0x8D847FCF4625F32\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:43 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825381151004315</Name><Deleted>true</Deleted><Version>01D679E7788E6446</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:23:32 GMT</Last-Modified><Etag>\"0x8D847FE9B048382\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:23:32 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:23:32 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159825381303905081</Name><Deleted>true</Deleted><Version>01D679E78BE0A71E</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:24:04 GMT</Last-Modified><Etag>\"0x8D847FEAE56F898\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:23:33 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:24:05 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826090773805897</Name><Deleted>true</Deleted><Version>01D679F7FE4A39BC</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:21:48 GMT</Last-Modified><Etag>\"0x8D8480F20C11941\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:21:48 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:21:48 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826160495503085</Name><Deleted>true</Deleted><Version>01D679F99DE8CE7E</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:33:25 GMT</Last-Modified><Etag>\"0x8D84810C05F782D\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:33:25 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:33:25 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826167603602576</Name><Deleted>true</Deleted><Version>01D679F9C84046E0</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:34:36 GMT</Last-Modified><Etag>\"0x8D84810EAB6F56A\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:34:36 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:34:36 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826167734201983</Name><Deleted>true</Deleted><Version>01D679F9DADE16AE</Version><Properties><Last-Modified>Mon, 24 Aug 2020 09:35:07 GMT</Last-Modified><Etag>\"0x8D84810FD54F378\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 9:34:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 09:35:08 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Share><Share><Name>share159826339042304688</Name><Deleted>true</Deleted><Version>01D679FDC615F3A8</Version><Properties><Last-Modified>Mon, 24 Aug 2020 10:03:11 GMT</Last-Modified><Etag>\"0x8D84814E88C84F7\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 10:03:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 10:03:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159826354901006641</Name><Deleted>true</Deleted><Version>01D679FE2497F4DF</Version><Properties><Last-Modified>Mon, 24 Aug 2020 10:05:49 GMT</Last-Modified><Etag>\"0x8D84815470F048D\"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 10:05:49 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 10:05:49 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share></Shares><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdb8-601a-002b-6bfe-79b7b5000000',
  'x-ms-client-request-id',
  '84bed3c9-4c06-4453-b52f-08d880dd51d7',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 10:05:49 GMT'
]);

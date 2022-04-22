let nock = require('nock');

module.exports.hash = "2dbbd7b1de93825199cbc77f577a73d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2022-04-22T21:24:06+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST UPDATE","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'W299xOtPmUCLmn7x5Vi87w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1747ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+xxjYgAAAAA2LYyPnWiZQrDwtiCh2pDsR1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'K4mIurOeIkST/BDzAYu5Ow.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '398ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/RxjYgAAAACfQW34Dl0VRZlSerYRD8J0R1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Could not find the ProgramBrief with key 'Azure|00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000'"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  't70tDcq1cE6jYsC/gp5XrQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2084ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/RxjYgAAAAC+IHsxiB5MTpIYic28/Ao2R1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', {"id":"00000000-0000-0000-0000-000000000000","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}})
  .query(true)
  .reply(201, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2022-04-22T21:24:18+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://gdossantos-acs-test-1.int.communication.azure.net/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000',
  'MS-CV',
  'Bit3rFLQn0mOUl0qajj2fA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2632ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0AB1jYgAAAAAKFauICLb0SpGHXLMMe5O6R1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000/attachments')
  .query(true)
  .reply(404, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"NotFound","message":"Not Found"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'KE5asD/1+EWaDTvPaljFpA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '347ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Ah1jYgAAAACmD1ST9u39TqoeRjs0+9ivR1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000/attachments/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"NotFound","message":"Not Found"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'conxspZNLUWJcp1ztcHfBQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '328ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Ax1jYgAAAADN/IaRM9KsQ59Hg0M6LqCnR1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'Ru040ZARhk2rFIHmhAEcNw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '402ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Ax1jYgAAAABdghLiISyoQZRErPU8x3boR1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Could not find the ProgramBrief with key 'Azure|00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000'"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'ssfLcnjqTUqVjk2wtweeVg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2746ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BB1jYgAAAAA7Xcb5B2LER5vfq02MtdwGR1JVMzBFREdFMDgwOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Fri, 22 Apr 2022 21:24:22 GMT'
]);

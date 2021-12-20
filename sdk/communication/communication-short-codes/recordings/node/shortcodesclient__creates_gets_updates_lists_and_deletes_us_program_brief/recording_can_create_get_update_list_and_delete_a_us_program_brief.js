let nock = require('nock');

module.exports.hash = "729ce8b81f0e8a973705fe2745a67478";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-20T23:00:04.1123909+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST UPDATE","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'oL3iJ/5cv0ytFjorbNgP6A.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1504ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09grBYQAAAACAnaFktvdNS5pHO+doU49pTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  '2HQlm6KmT0i7QbYJC6RfGQ.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '547ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+ArBYQAAAACqAkCp9LAtTYFZ9+h4yxq6TUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Could not find the ProgramBrief with key 'Azure|00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000'"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  't+FJBQbEX0icviae0QMgEA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '246ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+QrBYQAAAAAB4Aj6K0HlS6lJ27Qx+X92TUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', {"id":"00000000-0000-0000-0000-000000000000","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}})
  .query(true)
  .reply(201, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-20T23:00:11.3487853+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://smstestapp.communication.azure.com/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000',
  'Request-Context',
  'appId=',
  'MS-CV',
  'PKkPbf6lc0Sr1SVstgpeBg.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2239ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+QrBYQAAAABjVKsh3y5zSZBF4/ZuekEQTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-20T23:00:11.3487853+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'bdx+X6qixU6v1Zy4D9tDxA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1771ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+wrBYQAAAABH2QVzwnHJTbdf79u1vsAOTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', {"id":"00000000-0000-0000-0000-000000000000","programDetails":{"signUpUrl":"https://endpoint/updated-sign-up","termsOfServiceUrl":"https://endpoint/updated-terms","privacyPolicyUrl":"https://endpoint/updated-privacy"}})
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-20T23:00:11.3487853+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://endpoint/updated-sign-up","termsOfServiceUrl":"https://endpoint/updated-terms","privacyPolicyUrl":"https://endpoint/updated-privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'y4ExB7/R8ESMh9BfsxSAOQ.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2176ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/QrBYQAAAACKEx5vnjWYS6ffXKaA0QVfTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-20T23:00:11.3487853+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://endpoint/updated-sign-up","termsOfServiceUrl":"https://endpoint/updated-terms","privacyPolicyUrl":"https://endpoint/updated-privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'd5gCsTlS5EiMuHKJFKdFCw.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1831ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/wrBYQAAAAASHw1lq/R5RKfE/+CzEcLWTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs')
  .query(true)
  .reply(200, {"programBriefs":[{"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-20T23:00:11.3487853+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://endpoint/updated-sign-up","termsOfServiceUrl":"https://endpoint/updated-terms","privacyPolicyUrl":"https://endpoint/updated-privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'H6GWkSl3gkW71kYjw59GBQ.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1637ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0AQvBYQAAAADIOr8g0T7SQbj5CLWoK8VWTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'OaE7GGmZOkmM07UUB4OxAA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '515ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0AwvBYQAAAAAM4Vt/8mhlQp8CvISKRZahTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Could not find the ProgramBrief with key 'Azure|00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000'"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'JhYQHapa3k2Iyh9iiGuiqA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '239ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BAvBYQAAAAAE6qzLlHYnRbSg7ygUesHjTUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:20 GMT'
]);

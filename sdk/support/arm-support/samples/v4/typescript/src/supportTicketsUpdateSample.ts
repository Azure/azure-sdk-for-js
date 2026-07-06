// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateAdvancedDiagnosticConsentOfSupportTicketForSubscription.json
 */
async function updateAdvancedDiagnosticConsentOfASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.update("testticket", {
    advancedDiagnosticConsent: "Yes",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateContactDetailsOfSupportTicketForSubscription.json
 */
async function updateContactDetailsOfASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.update("testticket", {
    contactDetails: {
      additionalEmailAddresses: ["tname@contoso.com", "teamtest@contoso.com"],
      country: "USA",
      firstName: "first name",
      lastName: "last name",
      phoneNumber: "123-456-7890",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "test.name@contoso.com",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateEscalationStatusOfSupportTicketForSubscription.json
 */
async function updateEscalationStatusOfASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.update("testticket", {
    contactDetails: { phoneNumber: "123-456-7890" },
    directConnectEscalation: {
      azureEEStatus: "EscalationInitiated",
      reasonForEscalation: "Server is down and business is impacted",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateSeverityOfSupportTicketForSubscription.json
 */
async function updateSeverityOfASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.update("testticket", { severity: "critical" });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateStatusOfSupportTicketForSubscription.json
 */
async function updateStatusOfASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.update("testticket", { status: "closed" });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAdvancedDiagnosticConsentOfASubscriptionSupportTicket();
  await updateContactDetailsOfASubscriptionSupportTicket();
  await updateEscalationStatusOfASubscriptionSupportTicket();
  await updateSeverityOfASubscriptionSupportTicket();
  await updateStatusOfASubscriptionSupportTicket();
}

main().catch(console.error);

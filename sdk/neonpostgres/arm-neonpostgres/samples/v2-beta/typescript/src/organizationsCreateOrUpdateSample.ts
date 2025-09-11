// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2025-06-23-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rgneon", "myOrganization", {
    properties: {
      marketplaceDetails: {
        subscriptionId: "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "neon-tech",
          offerId: "neon-postgres",
          planId: "standard",
          planName: "Standard",
          termUnit: "Monthly",
          termId: "hjk5",
        },
      },
      userDetails: {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        upn: "john.doe@example.com",
        phoneNumber: "555-123-4567",
      },
      companyDetails: {
        companyName: "Contoso Ltd",
        country: "United States",
        officeAddress: "123 Main Street, Seattle, WA 98101",
        businessPhone: "555-987-6543",
        domain: "contoso.com",
        numberOfEmployees: 30,
      },
      partnerOrganizationProperties: {
        organizationId: "12a34b56-7c89-0d12-e34f-g56h7i8j9k0l",
        organizationName: "Contoso",
        singleSignOnProperties: {
          singleSignOnState: "Initial",
          enterpriseAppId: "98f76e54-3d21-0c9b-a87f-6e5d4c3b2a10",
          singleSignOnUrl: "https://login.microsoftonline.com/",
          aadDomains: ["contoso.com"],
        },
      },
      projectProperties: {
        entityName: "myProject",
        attributes: [{ name: "environment", value: "dev" }],
        regionId: "westus",
        storage: 22,
        pgVersion: 14,
        historyRetention: 3,
        defaultEndpointSettings: {
          autoscalingLimitMinCu: 3,
          autoscalingLimitMaxCu: 28,
        },
        branch: {
          entityName: "feature",
          attributes: [{ name: "environment", value: "dev" }],
          projectId: "project-123",
          parentId: "main-branch",
          roles: [
            {
              entityName: "read_only_role",
              attributes: [{ name: "environment", value: "dev" }],
              branchId: "branch-123",
              permissions: ["SELECT"],
              isSuperUser: true,
            },
          ],
          databases: [
            {
              entityName: "appdb",
              attributes: [{ name: "environment", value: "dev" }],
              branchId: "branch-123",
              ownerName: "postgres",
            },
          ],
          endpoints: [
            {
              entityName: "read-endpoint",
              attributes: [{ name: "environment", value: "dev" }],
              projectId: "project-123",
              branchId: "branch-123",
              endpointType: "read_only",
              size: { autoscalingLimitMinCu: 3, autoscalingLimitMaxCu: 14 },
            },
          ],
        },
        roles: [
          {
            entityName: "admin_role",
            attributes: [{ name: "environment", value: "dev" }],
            branchId: "branch-123",
            permissions: ["ALL"],
            isSuperUser: true,
          },
        ],
        databases: [
          {
            entityName: "maindb",
            attributes: [{ name: "environment", value: "dev" }],
            branchId: "branch-123",
            ownerName: "postgres",
          },
        ],
        endpoints: [
          {
            entityName: "primary-endpoint",
            attributes: [{ name: "environment", value: "dev" }],
            projectId: "project-123",
            branchId: "branch-123",
            endpointType: "read_only",
            size: { autoscalingLimitMinCu: 3, autoscalingLimitMaxCu: 14 },
          },
        ],
      },
    },
    tags: { environment: "development" },
    location: "westus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsCreateOrUpdateMaximumSet();
}

main().catch(console.error);

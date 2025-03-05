// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import RadiologyInsightsRestClient, {
  ClinicalDocumentTypeEnum,
  CodeableConcept,
  Coding,
  CompleteOrderDiscrepancyInference,
  Extension,
  ExtensionOutput,
  FindingInference,
  FollowupCommunicationInference,
  FollowupRecommendationInference,
  GenericProcedureRecommendation,
  getLongRunningPoller,
  ImagingProcedure,
  ImagingProcedureRecommendation,
  isUnexpected,
  LateralityDiscrepancyInference,
  LimitedOrderDiscrepancyInference,
  RadiologyInsightsJobOutput,
  RadiologyProcedureInference,
  SexMismatchInference,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = "https://<your-endpoint>";
    const credential = new DefaultAzureCredential();
    const client = RadiologyInsightsRestClient(endpoint, credential);
  });

  it("ReadmeSampleCriticalResultInference", async () => {
    const endpoint = "https://<your-endpoint>";
    const credential = new DefaultAzureCredential();
    const client = RadiologyInsightsRestClient(endpoint, credential);
    // @ts-preserve-whitespace
    const codingData = {
      system: "Http://hl7.org/fhir/ValueSet/cpt-all",
      code: "24727-0",
      display: "CT HEAD W CONTRAST IV",
    };
    // @ts-preserve-whitespace
    const code = {
      coding: [codingData],
    };
    // @ts-preserve-whitespace
    const patientInfo = {
      sex: "female",
      birthDate: new Date("1959-11-11T19:00:00+00:00"),
    };
    // @ts-preserve-whitespace
    const encounterData = {
      id: "encounterid1",
      period: {
        start: "2021-8-28T00:00:00",
        end: "2021-8-28T00:00:00",
      },
      class: "inpatient",
    };
    // @ts-preserve-whitespace
    const authorData = {
      id: "authorid1",
      fullName: "authorname1",
    };
    // @ts-preserve-whitespace
    const orderedProceduresData = {
      code: code,
      description: "CT HEAD W CONTRAST IV",
    };
    // @ts-preserve-whitespace
    const administrativeMetadata = {
      orderedProcedures: [orderedProceduresData],
      encounterId: "encounterid1",
    };
    // @ts-preserve-whitespace
    const content = {
      sourceType: "inline",
      value: ` Exam:  Head CT with Contrast
    
    History:  Headaches for 2 months
    Technique: Axial, sagittal, and coronal images were reconstructed from helical CT through the head without IV contrast.
    IV contrast:  100 mL IV Omnipaque 300.
    
    Findings: There is no mass effect. There is no abnormal enhancement of the brain or within injuries with IV contrast.
    However, there is no evidence of enhancing lesion in either internal auditory canal.
    Impression: Negative CT of the brain without IV contrast.
    I recommend a new brain CT within nine months.`,
    };
    // @ts-preserve-whitespace
    const patientDocumentData = {
      type: "note",
      clinicalType: ClinicalDocumentTypeEnum.RadiologyReport,
      id: "docid1",
      language: "en",
      authors: [authorData],
      specialtyType: "radiology",
      administrativeMetadata: administrativeMetadata,
      content: content,
      createdAt: new Date("2021-05-31T16:00:00.000Z"),
      orderedProceduresAsCsv: "CT HEAD W CONTRAST IV",
    };
    // @ts-preserve-whitespace
    const patientData = {
      id: "Samantha Jones",
      details: patientInfo,
      encounters: [encounterData],
      patientDocuments: [patientDocumentData],
    };
    // @ts-preserve-whitespace
    const inferenceTypes = [
      "finding",
      "ageMismatch",
      "lateralityDiscrepancy",
      "sexMismatch",
      "completeOrderDiscrepancy",
      "limitedOrderDiscrepancy",
      "criticalResult",
      "criticalRecommendation",
      "followupRecommendation",
      "followupCommunication",
      "radiologyProcedure",
    ];
    // @ts-preserve-whitespace
    const followupRecommendationOptions = {
      includeRecommendationsWithNoSpecifiedModality: true,
      includeRecommendationsInReferences: true,
      provideFocusedSentenceEvidence: true,
    };
    // @ts-preserve-whitespace
    const findingOptions = {
      provideFocusedSentenceEvidence: true,
    };
    // @ts-preserve-whitespace
    const inferenceOptions = {
      followupRecommendationOptions: followupRecommendationOptions,
      findingOptions: findingOptions,
    };
    // @ts-preserve-whitespace
    // Create RI Configuration
    const configuration = {
      inferenceOptions: inferenceOptions,
      inferenceTypes: inferenceTypes,
      locale: "en-US",
      verbose: false,
      includeEvidence: true,
    };
    // @ts-preserve-whitespace
    // create RI Data
    const radiologyInsightsJob = {
      jobData: {
        patients: [patientData],
        configuration: configuration,
      },
    };
    // @ts-preserve-whitespace
    // Create request body
    const radiologyInsightsParameter = { body: radiologyInsightsJob };
    // @ts-preserve-whitespace
    // Initiate radiology insights job and retrieve results
    const dateString = Date.now();
    const jobID = "jobId-" + dateString;
    const initialResponse = await client
      .path("/radiology-insights/jobs/{id}", jobID)
      .put(radiologyInsightsParameter);
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const poller = await getLongRunningPoller(client, initialResponse);
    const radiologyInsightsResult = await poller.pollUntilDone();
    // @ts-preserve-whitespace
    if (isUnexpected(radiologyInsightsResult)) {
      throw radiologyInsightsResult.body.error;
    }
    // @ts-preserve-whitespace
    const result = radiologyInsightsResult.body.result;
    // @ts-preserve-whitespace
    if (result) {
      for (const patientResult of result.patientResults) {
        if (patientResult.inferences) {
          for (const inference of patientResult.inferences) {
            if (inference.kind === "radiologyProcedure") {
              console.log("Radiology Procedure Inference found");
              const radiologyProcedureInference = inference as RadiologyProcedureInference;
              for (const procedureCode of radiologyProcedureInference?.procedureCodes || []) {
                console.log("   Procedure Codes: ");
                displayCodes(procedureCode.coding);
              }
              // @ts-preserve-whitespace
              if (radiologyProcedureInference.imagingProcedures) {
                console.log("   Imaging Procedure Codes: ");
                for (const imagingProcedure of radiologyProcedureInference.imagingProcedures) {
                  displayImaging(imagingProcedure);
                }
              }
              // @ts-preserve-whitespace
              if (radiologyProcedureInference.orderedProcedure) {
                console.log("   Ordered Procedure Codes: ");
                displayCodes(radiologyProcedureInference.orderedProcedure.code?.coding);
              }
              // @ts-preserve-whitespace
              if (radiologyProcedureInference.orderedProcedure.description) {
                console.log(
                  `   Description: ${radiologyProcedureInference.orderedProcedure.description}`,
                );
              }
            }
          }
        }
      }
    }
    // @ts-preserve-whitespace
    function displayCodes(codingList: Coding[] | undefined) {
      for (const coding of codingList || []) {
        console.log(`      Coding: ${coding.code} , ${coding.display} (${coding.system})`);
      }
    }
    // @ts-preserve-whitespace
    function displayImaging(images: ImagingProcedure): void {
      console.log("     Modality Codes: ");
      displayCodes(images.modality.coding);
      console.log("     Anatomy Codes: ");
      displayCodes(images.anatomy.coding);
      if (images.laterality) {
        console.log("     Laterality Codes: ");
        displayCodes(images.laterality.coding);
      }
      if (images.contrast) {
        console.log("     Contrast Codes: ");
        displayCodes(images.contrast.code.coding);
      }
      if (images.view) {
        console.log("     View Codes: ");
        displayCodes(images.view.code.coding);
      }
    }
  });

  it("ReadmeSampleAgeMismatch", async () => {
    function printResults(
      radiologyInsightsResult: RadiologyInsightsJobOutput,
      content: string,
    ): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "ageMismatch") {
            console.log("Age Mismatch Inference found: ");
            const evidence = findAgeEvidence(inference.extension, content);
            console.log("   Evidence: " + evidence);
          }
        }
      }
      // @ts-preserve-whitespace
      function findAgeEvidence(extensions: ExtensionOutput[], content: string) {
        let offset = -1;
        let length = -1;
        let piece = "";
        let evidence = "";
        // for loop needed for traversing from top to bottom of the array
        for (const first of extensions) {
          for (const ext of first.extension) {
            if (ext.url === "offset") {
              offset = ext.valueInteger;
            } else if (ext.url === "length") {
              length = ext.valueInteger;
            }
            if (offset > 0 && length > 0) {
              piece = content.substring(offset, offset + length);
            }
          }
          evidence += `${piece} `;
        }
        return evidence;
      }
    }
  });

  it("ReadmeSampleCompleteOrderDiscrepancy", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "completeOrderDiscrepancy") {
            const completeOrderDiscrepancyInference =
              inference as CompleteOrderDiscrepancyInference;
            console.log("Complete Order Discrepancy Inference found: ");
            console.log("   Ordertype: ");
            displayCodes({ codeableConcept: completeOrderDiscrepancyInference.orderType });
            // @ts-preserve-whitespace
            for (const missingBodyPart of completeOrderDiscrepancyInference.missingBodyParts) {
              console.log("   Missing Body Parts: ");
              displayCodes({ codeableConcept: missingBodyPart });
            }
            // @ts-preserve-whitespace
            for (const missingBodymeasure of completeOrderDiscrepancyInference.missingBodyPartMeasurements) {
              console.log("   Missing Body Part Measurements: ");
              displayCodes({ codeableConcept: missingBodymeasure });
            }
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes({ codeableConcept }: { codeableConcept: CodeableConcept }): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
    }
  });

  it("ReadmeSampleFindingInference", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      if (radiologyInsightsResult.result) {
        for (const patientResult of radiologyInsightsResult.result.patientResults) {
          if (patientResult.inferences) {
            for (const inference of patientResult.inferences) {
              console.log("Finding Inference found: ");
              if (inference.kind === "finding") {
                const findingInference = inference as FindingInference;
                // @ts-preserve-whitespace
                if (findingInference.finding.code) {
                  console.log("   Code: ");
                  displayCodes(findingInference.finding.code);
                }
                // @ts-preserve-whitespace
                for (const interpretation of findingInference.finding.interpretation) {
                  console.log("   Interpretation: ");
                  displayCodes(interpretation);
                }
                // @ts-preserve-whitespace
                for (const component of findingInference.finding.component) {
                  console.log("   Component code: ");
                  displayCodes(component.code);
                  if (component.valueCodeableConcept) {
                    console.log("     Value component codeable concept: ");
                    displayCodes(component.valueCodeableConcept);
                  }
                }
                // @ts-preserve-whitespace
                if (findingInference.extension) {
                  displaySectionInfo(findingInference);
                }
              }
            }
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes(codeableConcept: CodeableConcept): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
      // @ts-preserve-whitespace
      function displaySectionInfo(inference: { extension?: Extension[] }) {
        for (const extension of inference.extension || []) {
          if (extension.url === "section") {
            console.log("   Section:");
            for (const { url, valueString } of extension.extension || []) {
              console.log(`      ${url}: ${valueString}`);
            }
          }
        }
      }
    }
  });

  it("ReadmeSampleFollowUpCommunication", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "followupCommunication") {
            const followupCommunicationInference = inference as FollowupCommunicationInference;
            console.log("Followup Communication Inference found");
            if (followupCommunicationInference.communicatedAt) {
              console.log(
                `Communicated at: ${followupCommunicationInference.communicatedAt.join(" ")}`,
              );
            }
            if (followupCommunicationInference.recipient) {
              console.log(`Recipient: ${followupCommunicationInference.recipient.join(" ")}`);
            }
            console.log(`   Acknowledged: ${followupCommunicationInference.wasAcknowledged}`);
          }
        }
      }
    }
  });

  it("ReadmeSampleFollowUpRecommendation", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "followupRecommendation") {
            const followupRecommendationInference = inference as FollowupRecommendationInference;
            // @ts-preserve-whitespace
            console.log("Follow Up Recommendation Inference found");
            console.log(`   Is conditional: ${followupRecommendationInference.isConditional}`);
            console.log(`   Is guideline: ${followupRecommendationInference.isGuideline}`);
            console.log(`   Is hedging: ${followupRecommendationInference.isHedging}`);
            console.log(`   Is option: ${followupRecommendationInference.isOption}`);
            // @ts-preserve-whitespace
            const procedure = followupRecommendationInference.recommendedProcedure;
            if (procedure.kind === "genericProcedureRecommendation") {
              const genericProcedureRecommendation = procedure as GenericProcedureRecommendation;
              console.log(
                `   Recommended Generic Procedure: ${genericProcedureRecommendation.code}`,
              );
              console.log(`   Description: ${genericProcedureRecommendation.description}`);
            } else if (procedure.kind === "imagingProcedureRecommendation") {
              const imagingProcedureRecommendation = procedure as ImagingProcedureRecommendation;
              // @ts-preserve-whitespace
              for (const procedureCode of imagingProcedureRecommendation?.procedureCodes || []) {
                console.log("   Recommended Procedure Codes: ");
                displayCodes(procedureCode);
              }
              // @ts-preserve-whitespace
              for (const imagingProcedure of imagingProcedureRecommendation?.imagingProcedures ||
                []) {
                console.log("   Recommended Imaging Procedure Codes: ");
                displayImaging(imagingProcedure);
              }
            }
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes(codeableConcept: CodeableConcept): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
      // @ts-preserve-whitespace
      function displayImaging(images: ImagingProcedure): void {
        console.log("   Modality Codes: ");
        displayCodes(images.modality);
        console.log("   Anatomy Codes: ");
        displayCodes(images.anatomy);
        if (images.laterality) {
          console.log("   Laterality Codes: ");
          displayCodes(images.laterality);
        }
        if (images.contrast) {
          console.log("   Contrast Codes: ");
          displayCodes(images.contrast.code);
        }
        if (images.view) {
          console.log("   View Codes: ");
          displayCodes(images.view.code);
        }
      }
    }
  });

  it("ReadmeSampleLateralityDiscrepancy", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "lateralityDiscrepancy") {
            const lateralityDiscrepancyInference = inference as LateralityDiscrepancyInference;
            console.log("Laterality Discrepancy Inference found: ");
            displayCodes(lateralityDiscrepancyInference.lateralityIndication);
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes(codeableConcept: CodeableConcept): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
    }
  });

  it("ReadmeSampleLimitedOrderDiscrepancy", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "limitedOrderDiscrepancy") {
            const limitedOrderDiscrepancyInference = inference as LimitedOrderDiscrepancyInference;
            // @ts-preserve-whitespace
            console.log("Limited Order Discrepancy Inference found: ");
            console.log("   Ordertype: ");
            displayCodes(limitedOrderDiscrepancyInference.orderType);
            // @ts-preserve-whitespace
            for (const presentBodyParts of limitedOrderDiscrepancyInference?.presentBodyParts ||
              []) {
              console.log("   Present Body Parts: ");
              displayCodes(presentBodyParts);
            }
            // @ts-preserve-whitespace
            for (const presentBodymeasure of limitedOrderDiscrepancyInference?.presentBodyPartMeasurements ||
              []) {
              console.log("   Present Body Part Measurements: ");
              displayCodes(presentBodymeasure);
            }
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes(codeableConcept: CodeableConcept): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
    }
  });

  it("ReadmeSampleRadiologyProcedure", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "radiologyProcedure") {
            const radiologyProcedureInference = inference as RadiologyProcedureInference;
            console.log("Radiology Procedure Inference found");
            // @ts-preserve-whitespace
            for (const procedureCode of radiologyProcedureInference?.procedureCodes || []) {
              console.log("   Procedure Codes: ");
              displayCodes(procedureCode);
            }
            // @ts-preserve-whitespace
            for (const imagingProcedure of radiologyProcedureInference?.imagingProcedures || []) {
              console.log("   Imaging Procedure Codes: ");
              displayImaging(imagingProcedure);
            }
            // @ts-preserve-whitespace
            if (radiologyProcedureInference.orderedProcedure) {
              console.log("   Ordered Procedure Codes: ");
              displayCodes(radiologyProcedureInference.orderedProcedure.code);
            }
            // @ts-preserve-whitespace
            if (radiologyProcedureInference.orderedProcedure.description) {
              console.log(
                `   Description: ${radiologyProcedureInference.orderedProcedure.description}`,
              );
            }
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes(codeableConcept: CodeableConcept): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
      // @ts-preserve-whitespace
      function displayImaging(images: ImagingProcedure): void {
        console.log("   Modality Codes: ");
        displayCodes(images.modality);
        console.log("   Anatomy Codes: ");
        displayCodes(images.anatomy);
        if (images.laterality) {
          console.log("   Laterality Codes: ");
          displayCodes(images.laterality);
        }
        if (images.contrast) {
          console.log("   Contrast Codes: ");
          displayCodes(images.contrast.code);
        }
        if (images.view) {
          console.log("   View Codes: ");
          displayCodes(images.view.code);
        }
      }
    }
  });

  it("ReadmeSampleSexMismatch", async () => {
    function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
      for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
        for (const inference of patientResult?.inferences || []) {
          if (inference.kind === "sexMismatch") {
            const sexMismatchInference = inference as SexMismatchInference;
            console.log("Sex Mismatch Inference found: ");
            displayCodes(sexMismatchInference.sexIndication);
          }
        }
      }
      // @ts-preserve-whitespace
      function displayCodes(codeableConcept: CodeableConcept): void {
        for (const coding of codeableConcept.coding || []) {
          console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
        }
      }
    }
  });

  it("ReadmeSampleManagedIdentity", async () => {
    const managedIdentityClientId = "<client-id>";
    const endpoint = "https://<your-endpoint>";
    const credential = new DefaultAzureCredential({ managedIdentityClientId });
    const client = RadiologyInsightsRestClient(endpoint, credential);
    // @ts-preserve-whitespace
    const tokenResponse = await credential.getToken("https://cognitiveservices.azure.com/.default");
    // @ts-preserve-whitespace
    const jobID = "jobId-123456789";
    const radiologyInsightsJob = {
      jobData: {
        patients: [],
        configuration: {},
      },
    };
    // @ts-preserve-whitespace
    // Create request body
    const radiologyInsightsParameter = { body: radiologyInsightsJob };
    // Create request body
    const initialResponse = await client
      .path("/radiology-insights/jobs/{id}", jobID)
      .put(radiologyInsightsParameter, {
        headers: {
          Authorization: `Bearer ${tokenResponse?.token}`,
          "Content-Type": "application/json",
        },
      });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});

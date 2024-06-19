import createClient, {
  DeidentificationJob,
  DeidentificationJobOutput,
} from '@azure-rest/azure-health-deidentification';
import { DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const serviceEndpoint = 'https://example.api.cac001.deid.azure.com';
const storageAccountSASUri = "exampleSASUri";
const OUTPUT_FOLDER = "_output";
const inputPrefix = "example_patient_1";
const client = createClient(serviceEndpoint, credential);
const jobName = "exampleJob";

const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
};
const response = await client.path("/jobs/{name}", jobName).put({ body: job });

console.log((response.body as DeidentificationJobOutput));

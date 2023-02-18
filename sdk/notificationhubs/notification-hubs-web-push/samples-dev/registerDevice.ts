  import { 
  WebPushClientContext, 
  addTags, 
  createClientContext, 
  getInstallation, 
  removeTags 
} from "@azure/notification-hubs-web-push";

// Top Level Push Info
let endpoint: string = "";
let p256dh: string = "";
let auth: string = "";
let installationId: string = "";

// Tags management
let tags: string[] = [];
let tagToAdd = "";

const CONNECTION_STRING = "Endpoint=sb://azuresdktestns.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=JOx8Dm1iuY9XLKMk3/SfakKaJEQRMWZt/dS99Ipd7js=";
const HUB_NAME = "azuresdktesthub";
const VAPID_PUBLIC_KEY = "BHZQ34zCC3zEtzpjtUQNTpuJMwP4AujShC63hE3uuWLQdLhZ-t80dyJg7dWZ_IeU7M7bB4_VBqpRBaShNWceB6I";

let clientContext: WebPushClientContext;

async function registerWebPush() {

  clientContext = createClientContext(
    CONNECTION_STRING,
    HUB_NAME
  );

  const installation = await getInstallation(clientContext, VAPID_PUBLIC_KEY, { serviceWorkerUrl: "service-worker.js" });
  endpoint = installation.pushChannel.endpoint;
  p256dh = installation.pushChannel.p256dh;
  auth = installation.pushChannel.auth;
  installationId = installation.installationId;
}

async function addTagToList() {
  if (!clientContext) {
    return;
  }

  await addTags(clientContext, [tagToAdd]);

  tags = [...tags, tagToAdd];
  tagToAdd = "";
}

async function removeTag(tag: string) {
  if (!clientContext) {
    return;
  }

  await removeTags(clientContext, [tag]);

  tags = tags.filter((t) => t !== tag);
}

registerWebPush().then(async () => {
  // Register for Web Push
  await registerWebPush();

  // Log the details
  console.log("Endpoint: ", endpoint);
  console.log("P256DH: ", p256dh);
  console.log("Auth: ", auth);
  console.log("Installation ID: ", installationId);

  // Add tags
  tagToAdd = "likes_hockey";
  await addTagToList();

  // Remove tags
  await removeTag("likes_hockey");
}).catch((e) => {
  console.log("Error Web Push Sample: ", e);
});

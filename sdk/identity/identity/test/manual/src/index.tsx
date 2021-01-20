// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import * as ReactDOM from "react-dom";

import { InteractiveBrowserCredential, BrowserLoginStyle } from "@azure/identity";
import { KeyClient, KeyVaultKey } from "@azure/keyvault-keys";
import { ServiceBusClient } from "@azure/service-bus"

const getRandomKeyName = () => `key${Math.random()}`.replace(/\./g, "");

interface ClientDetails {
  tenantId: string,
  clientId: string,
  loginStyle: BrowserLoginStyle,
  keyName: string,
  serviceBusEndpoint: string,
  messageText: string
}

interface ClientDetailsEditorProps {
  clientDetails: ClientDetails,
  onSetClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>
}

function storeClientDetails(clientDetails: ClientDetails) {
  localStorage.setItem('clientDetails', JSON.stringify(clientDetails));
}

function readClientDetails(): ClientDetails {
  const detailsJson = localStorage.getItem('clientDetails')
  if (detailsJson) {
    const details = JSON.parse(detailsJson)
    details.credential = undefined;
    return details;
  }

  return undefined;
}

function getCredential(clientDetails: ClientDetails): InteractiveBrowserCredential | undefined {
  return clientDetails.tenantId.length > 0 && clientDetails.clientId.length > 0 ? new InteractiveBrowserCredential(clientDetails) : undefined;
}

function ClientDetailsEditor({ clientDetails, onSetClientDetails }: ClientDetailsEditorProps) {
  const handleDetailsChange = (newDetails: ClientDetails) => {
    storeClientDetails(newDetails)
    onSetClientDetails(newDetails)
  };

  const setLoginStyle = (loginStyle: BrowserLoginStyle) => {
    handleDetailsChange({
      ...clientDetails,
      loginStyle
    });
  }

  const setKeyName = (keyName: string) => {
    handleDetailsChange({
      ...clientDetails,
      keyName
    });
  }

  const setServiceBusEndpoint = (serviceBusEndpoint: string) => {
    handleDetailsChange({
      ...clientDetails,
      serviceBusEndpoint
    });
  }

  const setMessageText = (messageText: string) => {
    handleDetailsChange({
      ...clientDetails,
      messageText
    });
  }

  return (
    <div>
      <h3>Enter the details of your Azure AD App Registration:</h3>
      <form>
        <label>
          Tenant Id:
          <input type="text" value={clientDetails.tenantId} onChange={({ target }) => handleDetailsChange({ ...clientDetails, tenantId: target.value })} />
        </label>
        <br />
        <label>
          Client Id:
          <input type="text" value={clientDetails.clientId} onChange={({ target }) => handleDetailsChange({ ...clientDetails, clientId: target.value })} />
        </label>
        <br />
        <label>
          Fill to create a new key with this name:
          <input type="text" value={getRandomKeyName()} onChange={({ target }) => setKeyName(target.value)} />
        </label>
        <h4>Login Flow Style</h4>
        <div>
          <label>
            <input type="radio" value="popup" checked={clientDetails.loginStyle === "popup"} onChange={({ target }) => setLoginStyle(target.value as BrowserLoginStyle)} />
            Popup
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="redirect" checked={clientDetails.loginStyle === "redirect"} onChange={({ target }) => setLoginStyle(target.value as BrowserLoginStyle)} />
            Redirect
          </label>
        </div>
      </form>
    </div>
  );
}

function useKeyVaultKeys(vaultName: string, clientDetails: ClientDetails) {
  const [running, setRunning] = React.useState(false)
  const [keys, setKeys] = React.useState<KeyVaultKey[]>(undefined)
  const [error, setErrorInner] = React.useState(undefined);
  const url = `https://${vaultName}.vault.azure.net`;

  const setError = (err) => {
    setRunning(false)
    setErrorInner(err)
  }

  React.useEffect(() => {
    const credential = getCredential(clientDetails);
    if (vaultName.trim().length === 0) {
      setError("You must enter a vault name to fetch keys.")
    } else if (credential === undefined) {
      setError("You must enter client details to fetch keys.")
    } else if (running) {
      // Kick off the request asynchronously.  The setKeys call will
      // propagate the key list back to the UI state.
      const keyClient = new KeyClient(url, credential);
      (async () => {
        const keyResult = [];
        setKeys(keyResult);

        if (clientDetails.keyName) {
          try {
            await keyClient.createKey(clientDetails.keyName, "RSA");
          } catch (e) {
            console.info(e);
          }
        }

        for await (const keyProperties of keyClient.listPropertiesOfKeys()) {
          keyResult.push(await keyClient.getKey(keyProperties.name))
        }

        setKeys(keyResult);
        setRunning(false)
      })().catch(err => setError(err.toString()));
    } else {
      setError("")
    }
  }, [vaultName, clientDetails, running])

  return { keys, fetchKeys: () => setRunning(true), error }
}

interface KeyVaultTestProps {
  storedVaultName?: string,
  clientDetails: ClientDetails
}

const KeyVaultTest = ({ storedVaultName, clientDetails }: KeyVaultTestProps) => {
  const [vaultName, setVaultName] = React.useState(storedVaultName || "");
  const { keys, fetchKeys, error } = useKeyVaultKeys(vaultName, clientDetails);

  const handleVaultNameChange = (newVaultName) => {
    localStorage.setItem('keyVaultName', newVaultName);
    setVaultName(newVaultName);
  };

  return (
    <div>
      <h3>List Key Vault Keys</h3>
      <form onSubmit={e => { fetchKeys(); e.preventDefault(); }}>
        <label>
          Vault Name:
          <input type="text" value={vaultName} onChange={({ target }) => handleVaultNameChange(target.value)} />
        </label>
        <input type="submit" value="Get Keys" />
      </form>
      {!error ? null : <h3 style={{ color: "red" }}>{error}</h3>}
      {!keys ? null :
        (
          <table>
            <thead>
              <tr>
                <th>Key Name</th>
                <th>Enabled</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {keys.map(key => <tr key={key.name}><td>{key.name}</td><td>{key.properties.enabled.toString()}</td><td>{key.properties.expiresOn && key.properties.expiresOn.toDateString()}</td></tr>)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

function useServiceBus(serviceBusEndpoint: string, messageText: string, clientDetails: ClientDetails) {
  const [running, setRunning] = React.useState(false)
  const [error, setErrorInner] = React.useState(undefined);

  const setError = (err) => {
    setRunning(false)
    setErrorInner(err)
  }

  React.useEffect(() => {
    const credential = getCredential(clientDetails);
    if (serviceBusEndpoint.trim().length === 0) {
      setError("You must enter a service bus endpoint to send a message.")
    } else if (credential === undefined) {
      setError("You must enter client details to fetch keys.")
    } else if (running) {
      (async () => {
        const body = clientDetails.messageText || messageText;
        const queueName = "partitioned-queue";

        if (body) {
          console.log({ serviceBusEndpoint });
          const serviceBusClient = new ServiceBusClient(serviceBusEndpoint, credential);

          try {
            const sender = serviceBusClient.createSender(queueName);
            await sender.sendMessages({ body });
            await sender.close();
            const receiver = serviceBusClient.createReceiver(queueName);
            const messages = await receiver.receiveMessages(10);
            await receiver.close();
            console.log("Received messages:\n", messages.map(m => m.body.toString()).join("\n"));
          } catch (e) {
            console.info(e);
          } finally {
            await serviceBusClient.close();
          }
        }

        setRunning(false)
      })().catch(err => setError(err.toString()));
    } else {
      setError("")
    }
  }, [serviceBusEndpoint, messageText, clientDetails, running])

  return { sendMessage: () => setRunning(true), error }
}

interface ServiceBusTestProps {
  storedServiceBusEndpoint?: string,
  storedMessageText?: string,
  clientDetails: ClientDetails
}

const ServiceBusTest = ({ storedServiceBusEndpoint, storedMessageText, clientDetails }: ServiceBusTestProps) => {
  const [serviceBusEndpoint, setServiceBusEndpoint] = React.useState(storedServiceBusEndpoint || "");
  const [messageText, setMessageText] = React.useState(storedMessageText || "");
  const { sendMessage, error } = useServiceBus(serviceBusEndpoint, messageText, clientDetails);

  const handleServiceBusEndpointChange = (newServiceBusEndpoint) => {
    localStorage.setItem('serviceBusEndpoint', newServiceBusEndpoint);
    setServiceBusEndpoint(newServiceBusEndpoint);
  };

  const handleMessageText = (newMessageText) => {
    localStorage.setItem('messageText', newMessageText);
    setMessageText(newMessageText);
  };

  return (
    <div>
      <h3>Send Service Bus Endpoint</h3>
      <form onSubmit={e => { sendMessage(); e.preventDefault(); }}>
        <label>
          Service Bus Endpoint:
          <input type="text" value={serviceBusEndpoint} onChange={({ target }) => handleServiceBusEndpointChange(target.value)} />
        </label>
        <label>
          Message to send:
          <input type="text" value={messageText} onChange={({ target }) => handleMessageText(target.value)} />
        </label>
        <input type="submit" value="Send Message" />
      </form>
      {!error ? null : <h3 style={{ color: "red" }}>{error}</h3>}
    </div>
  );
}

function TestPage() {
  const storedVaultName = localStorage.getItem('keyVaultName');
  const storedServiceBusEndpoint = localStorage.getItem('serviceBusEndpoint');
  const storedMessageText = localStorage.getItem('messageText');
  const [clientDetails, setClientDetails] = React.useState<ClientDetails>(readClientDetails() || { tenantId: "", clientId: "", loginStyle: "popup", keyName: "", serviceBusEndpoint: "", messageText: "" })
  return (
    <div>
      <h1>Azure SDK Browser Manual Tests</h1>
      <hr />
      <ClientDetailsEditor clientDetails={clientDetails} onSetClientDetails={setClientDetails} />
      <KeyVaultTest storedVaultName={storedVaultName} clientDetails={clientDetails} />
      <ServiceBusTest storedServiceBusEndpoint={storedServiceBusEndpoint} storedMessageText={storedMessageText} clientDetails={clientDetails} />
    </div>
  );
}

ReactDOM.render(
  <TestPage />,
  document.getElementById("app")
);

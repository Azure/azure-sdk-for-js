// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CallClient, Features, CallAgent, Call } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { EnhancedUserFacingDiagnostics } from '../src/enhanced-diagnostics';

async function main() {
  // Setup calling client (replace with your actual credentials)
  const tokenCredential = new AzureCommunicationTokenCredential("your-token");
  const callClient = new CallClient();
  const callAgent = await callClient.createCallAgent(tokenCredential);
  
  // Start a call (replace with your actual call setup)
  // This is just for demonstration purposes
  console.log("Starting a call...");
  const call = callAgent.join({ groupId: "your-group-id" });

  // Instead of using the standard UserFacingDiagnostics:
  // const userFacingDiagnostics = call.feature(Features.UserFacingDiagnostics);
  
  // Use the enhanced version:
  const enhancedDiagnostics = new EnhancedUserFacingDiagnostics(call);
  
  // Subscribe to network events (these should now work properly)
  enhancedDiagnostics.network.on('diagnosticChanged', (event) => {
    console.log('Network diagnostic changed:', event);
    
    // Handle specific network events
    if (event.diagnostic === 'noNetwork' && event.value === true) {
      console.log('Network connection lost!');
    } else if (event.diagnostic === 'networkReconnect' && event.value === true) {
      console.log('Network connection restored!');
    } else if (event.diagnostic === 'networkReceiveQuality') {
      console.log(`Network quality: ${event.value}`);
    }
  });
  
  // Media events work as before
  enhancedDiagnostics.media.on('diagnosticChanged', (event) => {
    console.log('Media diagnostic changed:', event);
  });
  
  // Periodically log the latest diagnostics
  setInterval(() => {
    const networkDiagnostics = enhancedDiagnostics.network.getLatest();
    console.log('Latest network diagnostics:', networkDiagnostics);
  }, 5000);
  
  // Handle cleanup on application exit
  process.on('SIGINT', () => {
    console.log('Cleaning up...');
    enhancedDiagnostics.dispose();
    call.hangUp();
    process.exit(0);
  });
}

main().catch(console.error);
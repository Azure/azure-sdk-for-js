// Quick SDK testing utilities for development
// Add to browser console for rapid testing

// Test Connection
window.testConnection = () => {
  console.log('🔗 Testing SDK connection...');
  const connectBtn = document.getElementById('connectBtn');
  if (connectBtn) connectBtn.click();
};

// Test Audio
window.testAudio = () => {
  console.log('🎵 Testing audio capture...');
  const startBtn = document.getElementById('startBtn');
  if (startBtn && !startBtn.disabled) startBtn.click();
};

// Quick reconnect
window.quickReconnect = () => {
  console.log('🔄 Quick reconnect...');
  const stopBtn = document.getElementById('stopBtn');
  const connectBtn = document.getElementById('connectBtn');
  
  if (stopBtn && !stopBtn.disabled) stopBtn.click();
  setTimeout(() => {
    if (connectBtn) connectBtn.click();
  }, 1000);
};

// Show all events
window.showAllEvents = () => {
  console.log('📡 Showing all events...');
  const showEventsBtn = document.getElementById('showEvents');
  const filterCheckbox = document.getElementById('filterEvents');
  
  if (showEventsBtn) showEventsBtn.click();
  if (filterCheckbox) filterCheckbox.checked = false;
};

// Clear everything
window.clearAll = () => {
  console.log('🧹 Clearing all history...');
  const clearHistoryBtn = document.getElementById('clearHistory');
  const clearEventsBtn = document.getElementById('clearEvents');
  
  if (clearHistoryBtn) clearHistoryBtn.click();
  if (clearEventsBtn) clearEventsBtn.click();
};

// SDK state inspector
window.inspectSDK = () => {
  if (window.voiceAssistant) {
    console.log('🔍 SDK State:', {
      connectionStatus: window.voiceAssistant.connectionStatus,
      conversationStatus: window.voiceAssistant.conversationStatus,
      client: window.voiceAssistant.client
    });
  } else {
    console.log('❌ Voice assistant not available');
  }
};

// Force reload (for when rebuild.sh doesn't trigger reload)
window.forceReload = () => {
  console.log('🔄 Force reloading page...');
  window.location.reload();
};

// Auto-test sequence
window.autoTest = async () => {
  console.log('🤖 Running auto-test sequence...');
  
  window.clearAll();
  await new Promise(r => setTimeout(r, 500));
  
  window.testConnection();
  await new Promise(r => setTimeout(r, 2000));
  
  window.testAudio();
  await new Promise(r => setTimeout(r, 1000));
  
  window.showAllEvents();
  
  console.log('✅ Auto-test complete!');
};

console.log('🛠️ Quick test utilities loaded!');
console.log('Available commands:');
console.log('  testConnection() - Test SDK connection');
console.log('  testAudio() - Test audio capture');
console.log('  quickReconnect() - Disconnect and reconnect');
console.log('  showAllEvents() - Show event stream');
console.log('  clearAll() - Clear all history');
console.log('  inspectSDK() - Show SDK state');
console.log('  autoTest() - Run full test sequence');
console.log('  forceReload() - Force page reload (use after rebuild.sh)');
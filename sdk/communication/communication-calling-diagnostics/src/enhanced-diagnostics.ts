// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Call,
  UserFacingDiagnosticsFeature,
  Features,
  NetworkDiagnosticChangedEventArgs,
  MediaDiagnosticChangedEventArgs,
  DiagnosticQuality,
  NetworkDiagnostic,
  LatestDiagnosticValue
} from '@azure/communication-calling';

interface NetworkStats {
  rtt?: number;
  jitter?: number;
  packetLoss?: number;
  timestamp?: number;
}

interface NetworkMonitorOptions {
  /** How frequently to check network status (ms). Default: 2000ms */
  pollingInterval?: number;
  /** RTT threshold for poor network quality (ms). Default: 300ms */
  poorRttThreshold?: number;
  /** Packet loss threshold for poor network quality (%). Default: 5% */
  poorPacketLossThreshold?: number;
  /** Jitter threshold for poor network quality (ms). Default: 30ms */
  poorJitterThreshold?: number;
}

const DEFAULT_OPTIONS: Required<NetworkMonitorOptions> = {
  pollingInterval: 2000,
  poorRttThreshold: 300,
  poorPacketLossThreshold: 5,
  poorJitterThreshold: 30
};

/**
 * Enhanced version of the UserFacingDiagnostics feature.
 * This class provides improved network diagnostics that properly detect and emit network events
 * when network conditions change.
 */
export class EnhancedUserFacingDiagnostics {
  private _originalDiagnostics: UserFacingDiagnosticsFeature;
  private _networkMonitorInterval?: NodeJS.Timeout;
  private _options: Required<NetworkMonitorOptions>;
  private _previousNetworkState: boolean = true;
  private _networkStats: NetworkStats = {};
  private _latestNetworkDiagnostics: Record<string, LatestDiagnosticValue> = {};
  private _networkEventEmitter: EventTarget = new EventTarget();
  private _networkEventListeners: Map<string, Set<Function>> = new Map();

  /**
   * Creates a new instance of EnhancedUserFacingDiagnostics
   * @param call - The Call object from the Azure Communication Calling SDK
   * @param options - Configuration options for network monitoring
   */
  constructor(call: Call, options?: NetworkMonitorOptions) {
    this._originalDiagnostics = call.feature(Features.UserFacingDiagnostics);
    this._options = { ...DEFAULT_OPTIONS, ...options };
    
    // Setup event forwarders for media diagnostics
    this._originalDiagnostics.media.on('diagnosticChanged', this._forwardMediaEvent.bind(this));
    
    // Setup enhanced network monitoring
    this._startNetworkMonitoring();
  }

  /**
   * Media diagnostics interface, directly using the original implementation
   */
  public get media() {
    return this._originalDiagnostics.media;
  }

  /**
   * Enhanced network diagnostics interface
   */
  public get network() {
    return {
      /**
       * Subscribe to network diagnostic events
       * @param eventName - Event name ('diagnosticChanged')
       * @param listener - Callback function to be called when the event is triggered
       */
      on: (eventName: string, listener: (args: NetworkDiagnosticChangedEventArgs) => void): void => {
        if (!this._networkEventListeners.has(eventName)) {
          this._networkEventListeners.set(eventName, new Set());
        }
        this._networkEventListeners.get(eventName)?.add(listener);
      },

      /**
       * Unsubscribe from network diagnostic events
       * @param eventName - Event name ('diagnosticChanged')
       * @param listener - The listener function to remove
       */
      off: (eventName: string, listener: (args: NetworkDiagnosticChangedEventArgs) => void): void => {
        const listeners = this._networkEventListeners.get(eventName);
        if (listeners) {
          listeners.delete(listener);
        }
      },

      /**
       * Get the latest network diagnostic values
       * @returns Object with the latest network diagnostic values
       */
      getLatest: (): Record<string, LatestDiagnosticValue> => {
        // Return the enhanced network diagnostics that includes values
        // even when the original implementation returns empty
        return this._latestNetworkDiagnostics;
      }
    };
  }

  /**
   * Disposes the enhanced diagnostics and stops network monitoring
   */
  public dispose(): void {
    this._stopNetworkMonitoring();
    // Clear all listeners
    this._networkEventListeners.clear();
  }

  /**
   * Forwards media events from the original diagnostics to ensure they work correctly
   */
  private _forwardMediaEvent(args: MediaDiagnosticChangedEventArgs): void {
    // No need to do anything special with media events as they work correctly
  }

  /**
   * Starts the network monitoring process
   */
  private _startNetworkMonitoring(): void {
    // First, try to get initial network information from the original implementation
    const originalNetworkDiagnostics = this._originalDiagnostics.network.getLatest();
    
    // Check initial network state - assume network is available initially
    this._checkNetworkState();

    // Start polling for network status changes
    this._networkMonitorInterval = setInterval(() => {
      this._checkNetworkState();
    }, this._options.pollingInterval);

    // Also listen to original diagnostics in case they actually work
    this._originalDiagnostics.network.on('diagnosticChanged', (args: NetworkDiagnosticChangedEventArgs) => {
      // Forward original events and also update our tracked state
      this._emitNetworkEvent(args);
      
      // Update our latest diagnostics object
      if (args.diagnostic && args.value !== undefined) {
        this._latestNetworkDiagnostics[args.diagnostic] = {
          value: args.value,
          valueType: args.valueType
        };
      }
    });
  }

  /**
   * Stops the network monitoring process
   */
  private _stopNetworkMonitoring(): void {
    if (this._networkMonitorInterval) {
      clearInterval(this._networkMonitorInterval);
      this._networkMonitorInterval = undefined;
    }
  }

  /**
   * Checks current network state and emits events on changes
   */
  private _checkNetworkState(): void {
    const isOnline = navigator.onLine;
    
    // Detect network connection changes
    if (isOnline !== this._previousNetworkState) {
      this._previousNetworkState = isOnline;
      
      if (!isOnline) {
        // Emit "noNetwork" event when network connection is lost
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NoNetwork,
          value: true,
          valueType: 'boolean'
        });
      } else {
        // Emit "networkReconnect" event when network connection is restored
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkReconnect,
          value: true,
          valueType: 'boolean'
        });
        
        // Clear "noNetwork" state
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NoNetwork,
          value: false,
          valueType: 'boolean'
        });
      }
    }

    if (isOnline) {
      // If we have a connection, measure network quality
      this._measureNetworkQuality();
    }
  }

  /**
   * Measures network quality using available browser APIs and emits relevant events
   */
  private async _measureNetworkQuality(): Promise<void> {
    try {
      // Use RTCPeerConnection stats if available to measure network quality
      // This is just a simple implementation to demonstrate the concept
      const oldStats = this._networkStats;
      const newStats: NetworkStats = await this._getNetworkStats();
      
      if (newStats.rtt !== undefined && newStats.rtt > this._options.poorRttThreshold) {
        // High RTT indicates poor network quality
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkReceiveQuality,
          value: DiagnosticQuality.Poor,
          valueType: 'quality'
        });
      } else if (newStats.packetLoss !== undefined && newStats.packetLoss > this._options.poorPacketLossThreshold) {
        // High packet loss indicates poor network quality
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkSendQuality,
          value: DiagnosticQuality.Poor,
          valueType: 'quality'
        });
      } else if (isFinite(newStats.rtt || Infinity) && isFinite(oldStats.rtt || Infinity)) {
        // Network appears stable now, but we previously had issues
        const qualityValue = this._latestNetworkDiagnostics[NetworkDiagnostic.NetworkReceiveQuality]?.value;
        if (qualityValue === DiagnosticQuality.Poor || qualityValue === DiagnosticQuality.Bad) {
          this._emitNetworkEvent({
            diagnostic: NetworkDiagnostic.NetworkReceiveQuality,
            value: DiagnosticQuality.Good,
            valueType: 'quality'
          });
        }
      }
      
      // Store the stats for comparison on the next check
      this._networkStats = newStats;
    } catch (error) {
      console.warn('Failed to measure network quality:', error);
    }
  }

  /**
   * Gets network statistics using available browser APIs
   */
  private async _getNetworkStats(): Promise<NetworkStats> {
    const stats: NetworkStats = {
      timestamp: Date.now()
    };
    
    try {
      // Try to use the navigator.connection API if available
      const connection = (navigator as any).connection;
      if (connection) {
        // RTT is available in some browsers via the connection API
        if (connection.rtt) {
          stats.rtt = connection.rtt;
        }
        
        // In real implementation, we would do more sophisticated measurements
      }
      
      // In a real implementation, we would also use WebRTC stats API 
      // to get better network metrics from the active call
    } catch (error) {
      console.warn('Error getting network stats:', error);
    }
    
    return stats;
  }

  /**
   * Emits a network diagnostic event to all listeners
   */
  private _emitNetworkEvent(args: NetworkDiagnosticChangedEventArgs): void {
    // Update our diagnostics tracking
    if (args.diagnostic) {
      this._latestNetworkDiagnostics[args.diagnostic] = {
        value: args.value,
        valueType: args.valueType
      };
    }
    
    // Notify all listeners
    const listeners = this._networkEventListeners.get('diagnosticChanged');
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(args);
        } catch (error) {
          console.error('Error in network diagnostic listener:', error);
        }
      });
    }
  }
}
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface VideoFrame {
  data: ArrayBuffer;
  width: number;
  height: number;
  format: 'rgba' | 'rgb' | 'yuv420p';
  timestamp: number;
}

export interface AvatarFrame {
  blendshapes: Record<string, number>;
  visemes: Array<{ id: string; weight: number }>;
  timestamp: number;
}

export interface BlendshapeConfig {
  /** Mapping of blendshape names to their default values */
  defaults: Record<string, number>;
  /** Minimum and maximum values for each blendshape */
  ranges: Record<string, { min: number; max: number }>;
}

export interface VisemeConfig {
  /** List of supported viseme IDs */
  supportedVisemes: string[];
  /** Default viseme weights */
  defaultWeights: Record<string, number>;
}

/**
 * Handles video and avatar animation processing for Voice Live
 */
export class VideoProcessor {

  /**
   * Process avatar animation data
   */
  processAvatarFrame(
    blendshapes: any,
    visemes: any,
    timestamp: number
  ): AvatarFrame {
    return {
      blendshapes: this._normalizeBlendshapes(blendshapes),
      visemes: this._normalizeVisemes(visemes),
      timestamp
    };
  }

  /**
   * Convert video frame to base64
   */
  frameToBase64(frame: VideoFrame): string {
    const bytes = new Uint8Array(frame.data);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert base64 to video frame
   */
  base64ToFrame(
    base64: string, 
    width: number, 
    height: number, 
    format: VideoFrame['format']
  ): VideoFrame {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return {
      data: bytes.buffer,
      width,
      height,
      format,
      timestamp: Date.now()
    };
  }

  /**
   * Interpolate between two avatar frames for smooth animation
   */
  interpolateAvatarFrames(
    frameA: AvatarFrame, 
    frameB: AvatarFrame, 
    factor: number
  ): AvatarFrame {
    factor = Math.max(0, Math.min(1, factor)); // Clamp to [0, 1]

    const interpolatedBlendshapes: Record<string, number> = {};
    const allBlendshapeKeys = new Set([
      ...Object.keys(frameA.blendshapes),
      ...Object.keys(frameB.blendshapes)
    ]);

    for (const key of allBlendshapeKeys) {
      const valueA = frameA.blendshapes[key] || 0;
      const valueB = frameB.blendshapes[key] || 0;
      interpolatedBlendshapes[key] = valueA + (valueB - valueA) * factor;
    }

    // For visemes, use the frame that's closer in time
    const visemes = factor < 0.5 ? frameA.visemes : frameB.visemes;

    return {
      blendshapes: interpolatedBlendshapes,
      visemes: visemes.map(viseme => ({ ...viseme })), // Create copies
      timestamp: Date.now()
    };
  }

  /**
   * Validate avatar frame data
   */
  validateAvatarFrame(frame: AvatarFrame): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate blendshapes
    for (const [key, value] of Object.entries(frame.blendshapes)) {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.push(`Invalid blendshape value for ${key}: ${value}`);
      }
      if (value < 0 || value > 1) {
        errors.push(`Blendshape value for ${key} out of range [0, 1]: ${value}`);
      }
    }

    // Validate visemes
    for (const viseme of frame.visemes) {
      if (!viseme.id || typeof viseme.id !== 'string') {
        errors.push('Viseme missing valid id');
      }
      if (typeof viseme.weight !== 'number' || isNaN(viseme.weight)) {
        errors.push(`Invalid viseme weight for ${viseme.id}: ${viseme.weight}`);
      }
      if (viseme.weight < 0 || viseme.weight > 1) {
        errors.push(`Viseme weight for ${viseme.id} out of range [0, 1]: ${viseme.weight}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private _normalizeBlendshapes(blendshapes: any): Record<string, number> {
    if (!blendshapes || typeof blendshapes !== 'object') {
      return {};
    }

    const normalized: Record<string, number> = {};
    for (const [key, value] of Object.entries(blendshapes)) {
      if (typeof value === 'number' && !isNaN(value)) {
        normalized[key] = Math.max(0, Math.min(1, value));
      }
    }
    return normalized;
  }

  private _normalizeVisemes(visemes: any): Array<{ id: string; weight: number }> {
    if (!Array.isArray(visemes)) {
      return [];
    }

    return visemes
      .filter((viseme: any) => 
        viseme && 
        typeof viseme.id === 'string' && 
        typeof viseme.weight === 'number' && 
        !isNaN(viseme.weight)
      )
      .map((viseme: any) => ({
        id: viseme.id,
        weight: Math.max(0, Math.min(1, viseme.weight))
      }));
  }
}
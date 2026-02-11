
export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface UserProfile {
  gender: string;
  vibe: string;
  occasion: string;
  collection: string[];
}

export interface ScentDNA {
  woody: number;
  fresh: number;
  floral: number;
  spicy: number;
  sweet: number;
}

export interface PerfumeDiscovery {
  id: string;
  name: string;
  brand: string;
  vibe: 'Fresh' | 'Woody' | 'Floral' | 'Spicy';
  imageHint: string;
  imageUrl?: string;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export type ThemePalette = 'default' | 'fresh' | 'woody' | 'floral' | 'spicy';

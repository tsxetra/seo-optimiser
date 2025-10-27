export const TONES = ['Professional', 'Formal', 'Playful', 'Enthusiastic', 'Persuasive', 'Luxury'] as const;
export type Tone = typeof TONES[number];
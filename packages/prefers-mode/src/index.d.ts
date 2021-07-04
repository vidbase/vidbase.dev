import React from 'react';
import { SCHEME_PREFS, MOTION_PREFS, CONTRAST_PREFS } from './schemas';
interface IPrefersProviderProps {
}
export declare const getDefaultPrefs: () => {
    colorScheme: number;
    reducedMotion: number;
    contrast: number;
};
declare const usePrefers: () => void;
declare const PrefersProvider: React.FC<IPrefersProviderProps>;
export { PrefersProvider, usePrefers, SCHEME_PREFS, MOTION_PREFS, CONTRAST_PREFS };

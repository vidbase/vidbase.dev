declare const SCHEME_PREFS: {
    UNSUPPORTED: number;
    NO_PREFERENCE: number;
    DARK: number;
    LIGHT: number;
};
declare const MOTION_PREFS: {
    UNSUPPORTED: number;
    NO_PREFERENCE: number;
    REDUCE: number;
};
declare const CONTRAST_PREFS: {
    NO_PREFERENCE: number;
    MORE: number;
    LESS: number;
};
declare type IPrefersMode = {
    colorScheme: number;
    reducedMotion: number;
    contrast: number;
};
declare const usePrefersMode: () => IPrefersMode;
export default usePrefersMode;
export { SCHEME_PREFS, MOTION_PREFS, CONTRAST_PREFS };

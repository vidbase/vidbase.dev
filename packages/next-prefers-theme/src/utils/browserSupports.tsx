const INVALID_MEDIAQ_VALUES = ['not all', `"(navigation-controls)"`]

export const BrowserSupports = (mediaQueryList: MediaQueryList) => {
	return INVALID_MEDIAQ_VALUES.indexOf(mediaQueryList.media) < 0
}

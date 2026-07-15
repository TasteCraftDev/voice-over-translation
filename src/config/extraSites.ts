import { VideoService } from "@vot.js/core/types/service";
import type { ServiceConf } from "@vot.js/ext/types/service";

/**
 * Sites missing from the @vot.js sites list that should still get
 * the VOT interface. Translation is requested with the raw page URL.
 */
const extraServices: ServiceConf[] = [
  {
    host: VideoService.custom,
    url: "stub",
    match: (url: URL) =>
      /(^|\.)magenta\.tv$/.test(url.hostname) &&
      url.pathname.startsWith("/streamen-tv"),
    rawResult: true,
  },
];

export function getMatchedExtraServices(): ServiceConf[] {
  const url = new URL(globalThis.location.href);
  return extraServices.filter(({ match }) => {
    if (match instanceof RegExp) {
      return match.test(url.hostname);
    }
    return typeof match === "function" ? match(url) : false;
  });
}

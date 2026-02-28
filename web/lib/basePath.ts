/**
 * Base path for assets on GitHub Pages project site.
 * Uses runtime pathname so images load even if env wasn't inlined.
 */
export function getBasePath(): string {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/zametka-quiz")) {
    return "/zametka-quiz";
  }
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function createWhatsAppUrl(baseUrl: string, message: string) {
  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
}

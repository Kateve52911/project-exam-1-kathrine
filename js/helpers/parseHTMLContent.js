export function parseHTMLContent(htmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html");
}

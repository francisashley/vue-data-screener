import { escapeRegExp } from "./regex.utils";

export default function highlightText(
  value: string,
  highlight: string,
): string {
  const highlightExp = new RegExp(escapeRegExp(highlight), "ig");
  return value.replace(highlightExp, (match) => `<mark>${match}</mark>`);
}

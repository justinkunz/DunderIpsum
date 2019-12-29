/**
 * Action to check or uncheck a character
 *
 * @param {String} payload Name of character to select/deselect
 */
export function toggleChar(payload) {
  return { type: "TOGGLE_CHAR_SELECT", payload };
}

/**
 * Action to check or uncheck all characters
 */
export function toggleAll(payload) {
  return { type: "TOGGLE_ALL", payload };
}

/**
 * Action to change btn text on clipboard copy
 */
export function updateClipboard(payload) {
  console.log("updating clipboard");
  return { type: "ALERT_CLIPBOARD_COPY", payload };
}

/**
 * Updates Choosen Paragraph Count
 *
 * @param {Integer} payload Number of paragraphs to update to
 */
export function updatePCount(payload) {
  return { type: "UPDATE_P_COUNT", payload };
}

/**
 * Toggle on/off NSFW Results
 */
export function toggleNSFW(payload) {
  return { type: "TOGGLE_NSFW", payload };
}

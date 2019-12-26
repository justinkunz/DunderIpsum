import API from "../api";

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
 * Called on page load - async fn to get character names based on available ipsums
 */
export function getCharacters() {
  console.log("called getCharacters");
  return async dispatch => {
    const chars = await API.getChars();
    dispatch(loadChars(chars.data));
  };
}

/**
 * Action to load characters to page
 *
 * @param {String[]} payload Array of character names
 */
export function loadChars(payload) {
  console.log("called load char", payload);
  return { type: "LOAD_CHARS", payload };
}

/**
 * Called on Generate Ipsums btn push - async fn to get ipsums on condition
 *
 * @param {Object} payload Conditions to get ipsums on (which characters, limit etc)
 */
export function getIpsums(payload) {
  return async dispatch => {
    const ipsums = await API.ipsums(payload);
    dispatch(loadIpsums(ipsums.data));
  };
}

/**
 * Action to map Ipsum results to page
 *
 * @param {String[]} payload Array of ipsums
 */
export function loadIpsums(payload) {
  return { type: "LOAD_IPSUMS", payload };
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

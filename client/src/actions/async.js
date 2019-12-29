import API from "../api";

/**
 * Toggle Loader on async start/end
 *
 * @param {String} payload Loader section to toggle (characters || ipsums)
 */
export function toggleLoader(payload) {
  return { type: "TOGGLE_LOADER", payload };
}

// ************
// IPSUMS - Called when users clicks generate ipsums button
// ************

/**
 * Called on Generate Ipsums btn push - async fn to get ipsums on condition
 *
 * @param {Object} payload Conditions to get ipsums on (which characters, limit etc)
 */
export function getIpsums(payload) {
  return async dispatch => {
    dispatch(toggleLoader("ipsums"));
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

// ************
// CHARACTERS - Called on inital page load
// ************

/**
 * Called on page load - async fn to get character names based on available ipsums
 */
export function getCharacters() {
  return async dispatch => {
    dispatch(toggleLoader("characters"));
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

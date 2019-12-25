import API from "../api";

export function toggleChar(payload) {
  return { type: "TOGGLE_CHAR_SELECT", payload };
}
export function toggleAll(payload) {
  return { type: "TOGGLE_ALL", payload };
}

export function getCharacters(payload) {
  console.log("called getCharacters");
  return function(dispatch) {
    API.getChars().then(chars => {
      dispatch(loadChars(chars.data));
    });
  };
}

export function loadChars(payload) {
  console.log("called load char", payload);
  return { type: "LOAD_CHARS", payload };
}

export function getIpsums(payload) {
  return function(dispatch) {
    API.ipsums(payload).then(ipsums => {
      dispatch(loadIpsums(ipsums.data));
    });
  };
}

export function updateClipboard(payload) {
  console.log("updating clipboard");
  return { type: "ALERT_CLIPBOARD_COPY", payload };
}

export function loadIpsums(payload) {
  return { type: "LOAD_IPSUMS", payload };
}

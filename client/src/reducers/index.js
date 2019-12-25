const selectAllToggle = {
  text: "Select All",
  show: true
};

const deselectAllToggle = {
  text: "Deselect All",
  trigger: false
};

const initialState = {
  isFetching: false,
  options: {
    choosen: {}
  },
  ipsums: [],
  characters: [],
  toggleBtn: selectAllToggle,
  copiedBtnTxt: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Load Characters - On page load
    case "LOAD_CHARS":
      const choosen = payload.reduce((a, c) => {
        a[c] = false;
        return a;
      }, {});

      return {
        ...state,
        characters: payload,
        options: { ...state.options, choosen }
      };

    // Load Ipsums - On Button Submit
    case "LOAD_IPSUMS":
      console.log("loading ipsums");
      return {
        ...state,
        ipsums: payload,
        copied: false
      };

    // Select / Deselect Single Character
    case "TOGGLE_CHAR_SELECT":
      const choosenChars = {
        ...state.options.choosen
      };

      choosenChars[payload] = !choosenChars[payload];

      return {
        ...state,
        options: {
          ...state.options,
          choosen: choosenChars
        }
      };

    // Select / Deselect All Characters
    case "TOGGLE_ALL":
      const btnState = state.toggleBtn.show
        ? deselectAllToggle
        : selectAllToggle;

      const allToggled = state.characters.reduce((a, c) => {
        a[c] = state.toggleBtn.show;
        return a;
      }, {});

      return {
        ...state,
        options: { ...state.options, choosen: allToggled },
        toggleBtn: btnState
      };

    // Show Copied to Clipboard Success Msg
    case "ALERT_CLIPBOARD_COPY":
      console.log("reducee");
      return { ...state, copied: true };
    default:
      return state;
  }
};

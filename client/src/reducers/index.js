const selectAllToggle = {
  text: "Select All Characters",
  show: true
};

const deselectAllToggle = {
  text: "Deselect All Characters",
  trigger: false
};

const initialState = {
  isFetching: {
    characters: false,
    ipsums: false
  },
  options: {
    choosen: {},
    limit: 5,
    nsfw: false
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
        isFetching: { ...state.isFetching, characters: false },
        options: { ...state.options, choosen }
      };

    // Load Ipsums - On Button Submit
    case "LOAD_IPSUMS":
      console.log("loading ipsums");
      return {
        ...state,
        ipsums: payload,
        isFetching: { ...state.isFetching, ipsums: false },
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
      return { ...state, copied: true };

    // Change Paragraph Limit
    case "UPDATE_P_COUNT":
      return { ...state, options: { ...state.options, limit: payload } };
    case "TOGGLE_NSFW":
      return {
        ...state,
        options: { ...state.options, nsfw: !state.options.nsfw }
      };

    case "TOGGLE_LOADER":
      const updatedLoader = state.isFetching;

      updatedLoader[payload] = !state.isFetching[payload];

      return {
        ...state,
        isFetching: updatedLoader
      };
    default:
      return state;
  }
};

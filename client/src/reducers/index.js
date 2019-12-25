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
  console.log("reducer called", action);
  const { type, payload } = action;

  switch (type) {
    case "LOAD_CHARS":
      console.log("load chars route");

      const choosen = payload.reduce((a, c) => {
        a[c] = false;
        return a;
      }, {});

      return {
        ...state,
        characters: payload,
        options: { ...state.options, choosen }
      };

    case "LOAD_IPSUMS":
      console.log("loading ipsums");
      return {
        ...state,
        ipsums: payload
      };
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

    case "ALERT_CLIPBOARD_COPY":
      console.log("reducee");
      return { ...state, copied: true };
    default:
      return state;
  }
};

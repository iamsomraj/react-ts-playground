import React, { useReducer } from 'react';

interface IThemeState {
  theme: string;
}

enum ActionTypes {
  DARK_ACTION_TYPE,
  LIGHT_ACTION_TYPES,
}

const themeState: IThemeState = {
  theme: 'dark',
};

type darkThemeActionType = {
  type: ActionTypes.DARK_ACTION_TYPE;
  payload: 'dark';
};

type lightThemeActionType = {
  type: ActionTypes.LIGHT_ACTION_TYPES;
  payload: 'light';
};

type actionType = darkThemeActionType | lightThemeActionType;

const themeReducer = (state: IThemeState = themeState, action: actionType): IThemeState => {
  switch (action.type) {
    case ActionTypes.DARK_ACTION_TYPE: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case ActionTypes.LIGHT_ACTION_TYPES: {
      return {
        ...state,
        theme: action.payload,
      };
    }
  }
};

const useThemeContext = () => {
  const [state, dispatch] = useReducer(themeReducer, themeState);
  const setDarkTheme = () => {
    dispatch({
      type: ActionTypes.DARK_ACTION_TYPE,
      payload: 'dark',
    });
  };

  const setLightTheme = () => {
    dispatch({
      type: ActionTypes.LIGHT_ACTION_TYPES,
      payload: 'light',
    });
  };

  return {
    theme: state.theme,
    setLightTheme,
    setDarkTheme,
  };
};

const initialState = {
  theme: 'dark',
  setLightTheme: () => {},
  setDarkTheme: () => {},
};

const ThemeContext = React.createContext(initialState);

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider: React.FunctionComponent<ThemeContextProviderProps> = (props) => {
  return <ThemeContext.Provider value={useThemeContext()}>{props.children}</ThemeContext.Provider>;
};

export default ThemeContext;

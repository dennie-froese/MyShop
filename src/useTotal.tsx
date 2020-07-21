import React, {ReactNode, createContext, useReducer} from 'react';

const defaultState = {
  total: 0,
};

type State = {
  total: number;
};

type Action = {type: 'INC'} | {type: 'DEC'};
type Dispatch = (action: Action) => void;

const TotalStateContext = createContext<State>(defaultState);
const TotalDispatchContext = createContext<Dispatch | undefined>(undefined);

function totalReducer(state: State, action: Action) {
  switch (action.type) {
    case 'INC': {
      return {total: state.total};
    }
    case 'DEC': {
      return {total: state.total};
    }
    default: {
      throw new Error(`Unhandled action`);
    }
  }
}

export function TotalProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(totalReducer, defaultState);

  return (
    <TotalStateContext.Provider value={state}>
      <TotalDispatchContext.Provider value={dispatch}>
        {children}
      </TotalDispatchContext.Provider>
    </TotalStateContext.Provider>
  );
}

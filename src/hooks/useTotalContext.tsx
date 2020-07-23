import React, {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useCallback,
} from 'react';
import {ProgressViewIOSComponent} from 'react-native';

const defaultState = {
  total: 0,
};

type State = {
  total: number;
};

type Action = {type: 'INC'; price: number} | {type: 'DEC'; price: number};
type Dispatch = (action: Action) => void;

const TotalContext = createContext<State>(defaultState);
const TotalDispatchContext = createContext<Dispatch | undefined>(undefined);

function totalReducer(state: State, action: Action) {
  switch (action.type) {
    case 'INC': {
      // console.warn(state.total);
      return {total: state.total + action.price};
    }
    case 'DEC': {
      return {total: state.total - action.price};
    }
    default: {
      throw new Error(`Unhandled action`);
    }
  }
}

export function TotalProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(totalReducer, defaultState);

  return (
    <TotalContext.Provider value={state}>
      <TotalDispatchContext.Provider value={dispatch}>
        {children}
      </TotalDispatchContext.Provider>
    </TotalContext.Provider>
  );
}

export function useTotal() {
  const context = useContext(TotalContext);

  if (context === undefined) {
    throw new Error('useTotal must be used within a TotalProvider');
  }
  return context.total;
}

export function useIncDec(price: number) {
  const context = useContext(TotalDispatchContext);

  if (context === undefined) {
    throw new Error('useIncDec must be used within a TotalProvider');
  }

  const inc = useCallback(() => context({price: price, type: 'INC'}), [
    context,
  ]);
  const dec = useCallback(() => context({price: price, type: 'DEC'}), [
    context,
  ]);

  return {inc, dec};
}

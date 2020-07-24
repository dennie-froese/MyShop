import React, {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useCallback,
} from 'react';

const defaultState = {
  total: 0,
  discount: 0,
};

type State = {
  total: number;
  discount: number;
};

type Action =
  | {type: 'INC'; price: number}
  | {type: 'DEC'; price: number}
  | {type: 'DISCOUNT'; value: number};

type Dispatch = (action: Action) => void;

const TotalContext = createContext<State>(defaultState);
const TotalDispatchContext = createContext<Dispatch | undefined>(undefined);

function totalReducer(state: State, action: Action) {
  switch (action.type) {
    case 'INC': {
      return {...state, total: state.total + action.price};
    }
    case 'DEC': {
      return {...state, total: state.total - action.price};
    }
    case 'DISCOUNT': {
      return {...state, discount: state.total * (action.value / 100)};
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

export function useDiscountApply(value: number) {
  const context = useContext(TotalDispatchContext);

  if (context === undefined) {
    throw new Error('useDiscount must be used within a TotalProvider');
  }

  const discountApply = useCallback(
    () => context({type: 'DISCOUNT', value: value}),
    [context],
  );

  return discountApply;
}

import { createContext, useContext, useReducer, useCallback } from 'react';

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  page: 'dashboard',
  miraState: 'normal',   // 'normal' | 'scanning' | 'warning' | 'danger'
  miraMessage: "Hi! I'm Mira 💜 Click me if something looks suspicious!",
  showBubble: true,
  chatOpen: false,
  currentResult: null,
  chatMessages: [],
  scanHistory: [
    { id: 1, date: 'Today, 2:30 PM', type: 'URL', content: 'secure-paypal-login.xyz', result: 'Danger', riskLevel: 'Critical' },
    { id: 2, date: 'Today, 11:15 AM', type: 'Text', content: 'You\'ve won a free iPhone! Claim now', result: 'Warning', riskLevel: 'Medium' },
    { id: 3, date: 'Yesterday', type: 'URL', content: 'google.com/mail', result: 'Safe', riskLevel: 'Safe' },
  ],
  user: { name: 'Alex', scansCount: 15, lessonsCompleted: 4, dangerousFound: 7, safeScans: 8 },
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function miraReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':           return { ...state, page: action.payload };
    case 'SET_MIRA_STATE':     return { ...state, miraState: action.payload };
    case 'SET_MIRA_MESSAGE':   return { ...state, miraMessage: action.payload };
    case 'SET_SHOW_BUBBLE':    return { ...state, showBubble: action.payload };
    case 'SET_CHAT_OPEN':      return { ...state, chatOpen: action.payload };
    case 'SET_CURRENT_RESULT': return { ...state, currentResult: action.payload };
    case 'ADD_CHAT_MESSAGE':   return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_CHAT_MESSAGES':  return { ...state, chatMessages: action.payload };
    case 'ADD_SCAN_HISTORY':
      return {
        ...state,
        scanHistory: [action.payload, ...state.scanHistory],
        user: { ...state.user, scansCount: state.user.scansCount + 1 },
      };
    default: return state;
  }
}

// ─── Context & Provider ───────────────────────────────────────────────────────
const MiraContext = createContext(null);

export function MiraProvider({ children }) {
  const [state, dispatch] = useReducer(miraReducer, initialState);

  const setPage           = useCallback((p)  => dispatch({ type: 'SET_PAGE',           payload: p }),  []);
  const setMiraState      = useCallback((s)  => dispatch({ type: 'SET_MIRA_STATE',     payload: s }),  []);
  const setMiraMessage    = useCallback((m)  => dispatch({ type: 'SET_MIRA_MESSAGE',   payload: m }),  []);
  const setShowBubble     = useCallback((v)  => dispatch({ type: 'SET_SHOW_BUBBLE',    payload: v }),  []);
  const setChatOpen       = useCallback((o)  => dispatch({ type: 'SET_CHAT_OPEN',      payload: o }),  []);
  const setCurrentResult  = useCallback((r)  => dispatch({ type: 'SET_CURRENT_RESULT', payload: r }), []);
  const addChatMessage    = useCallback((m)  => dispatch({ type: 'ADD_CHAT_MESSAGE',   payload: m }),  []);
  const setChatMessages   = useCallback((ms) => dispatch({ type: 'SET_CHAT_MESSAGES',  payload: ms }), []);
  const addScanHistory    = useCallback((r)  => dispatch({ type: 'ADD_SCAN_HISTORY',   payload: r }),  []);

  return (
    <MiraContext.Provider value={{
      ...state,
      setPage, setMiraState, setMiraMessage, setShowBubble,
      setChatOpen, setCurrentResult, addChatMessage, setChatMessages, addScanHistory,
    }}>
      {children}
    </MiraContext.Provider>
  );
}

export function useMira() {
  const ctx = useContext(MiraContext);
  if (!ctx) throw new Error('useMira must be used within <MiraProvider>');
  return ctx;
}

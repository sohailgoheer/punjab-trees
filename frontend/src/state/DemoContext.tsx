import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface DemoState {
  likedIds: ReadonlySet<string>;
  followedTreeIds: ReadonlySet<string>;
  savedIds: ReadonlySet<string>;
  readNotificationIds: ReadonlySet<string>;
  toggleLike: (id: string) => void;
  toggleFollow: (id: string) => void;
  toggleSave: (id: string) => void;
  markRead: (id: string) => void;
  markAllRead: (ids: string[]) => void;
  announce: (message: string) => void;
}
const Context = createContext<DemoState | null>(null);
const toggle = (values: ReadonlySet<string>, id: string): Set<string> => {
  const next = new Set(values);
  if (next.has(id)) next.delete(id); else next.add(id);
  return next;
};

export function DemoProvider({ children }: { children: ReactNode }) {
  const [likedIds, setLikedIds] = useState<ReadonlySet<string>>(() => new Set());
  const [followedTreeIds, setFollowedTreeIds] = useState<ReadonlySet<string>>(() => new Set());
  const [savedIds, setSavedIds] = useState<ReadonlySet<string>>(() => new Set());
  const [readNotificationIds, setReadIds] = useState<ReadonlySet<string>>(() => new Set());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value: DemoState = {
    likedIds, followedTreeIds, savedIds, readNotificationIds,
    toggleLike: (id) => setLikedIds((old) => toggle(old, id)),
    toggleFollow: (id) => setFollowedTreeIds((old) => toggle(old, id)),
    toggleSave: (id) => setSavedIds((old) => toggle(old, id)),
    markRead: (id) => setReadIds((old) => new Set([...old, id])),
    markAllRead: (ids) => setReadIds((old) => new Set([...old, ...ids])),
    announce: setToast,
  };

  return (
    <Context.Provider value={value}>
      {children}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </Context.Provider>
  );
}

export function useDemo(): DemoState {
  const state = useContext(Context);
  if (!state) throw new Error('useDemo must be called inside DemoProvider');
  return state;
}

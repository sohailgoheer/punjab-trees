import { Info } from 'lucide-react';

export function NoticeTag({ compact = false }: { compact?: boolean }) {
  return <span className={`demo-tag${compact ? ' demo-tag--compact' : ''}`} title="Phase 01 mock data. Nothing is saved on a server."><Info size={13} aria-hidden="true" /> {compact ? 'Demo' : 'Fictional demo data'}</span>;
}

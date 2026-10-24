import type { Person } from '../types/models';

export function Avatar({ person, size = 'md' }: { person?: Person; size?: 'sm' | 'md' | 'lg' }) {
  const initials = person?.initials ?? 'TS';
  return <span className={`avatar avatar--${size}`} style={{ backgroundColor: person?.color ?? '#dcead9' }} aria-label={person?.displayName ?? 'TreeStory'}>{initials}</span>;
}

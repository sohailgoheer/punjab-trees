import { comments, people, posts, trees } from '../data/fixtures';
import type { Person, Species, TreePost, TreeRecord } from '../types/models';

export const getTree = (id: string): TreeRecord | undefined => trees.find((tree) => tree.publicId === id);
export const getPerson = (id: string): Person | undefined => people.find((person) => person.id === id);
export const getPost = (id: string): TreePost | undefined => posts.find((post) => post.id === id);

export const feedPosts = (): TreePost[] =>
  [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));

export const timelineForTree = (treeId: string): TreePost[] =>
  posts.filter((post) => post.treeId === treeId)
    .sort((a, b) => b.observedAt.localeCompare(a.observedAt) || a.id.localeCompare(b.id));

export const commentsForPost = (postId: string) => comments.filter((comment) => comment.postId === postId);

export const treesForPerson = (id: string): TreeRecord[] => trees.filter((tree) => tree.registeredBy === id);

export const displayDate = (value: string | null): string =>
  value ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value)) : 'Unknown date';

export const shortDate = (value: string): string =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(value));

export const countBySpecies = (): Array<{ species: Species; count: number }> => {
  const counts = new Map<Species, number>();
  for (const tree of trees) counts.set(tree.species, (counts.get(tree.species) ?? 0) + 1);
  return [...counts].map(([species, count]) => ({ species, count })).sort((a, b) => b.count - a.count || a.species.localeCompare(b.species));
};

export const searchTrees = (query: string, species?: Species | 'All'): TreeRecord[] =>
  trees.filter((tree) => {
    const normalized = query.trim().toLowerCase();
    const matchesText = !normalized || [tree.displayName, tree.species, tree.city, tree.summary]
      .some((value) => value.toLowerCase().includes(normalized));
    return matchesText && (!species || species === 'All' || species === tree.species);
  });

import { describe, expect, it } from 'vitest';
import { comments, people, posts, trees } from './fixtures';
import { commentsForPost, feedPosts, getPost, getTree, searchTrees, timelineForTree, treesForPerson } from '../lib/collections';

describe('fictional dataset invariants', () => {
  it('uses unique stable 26-character canonical public tree IDs', () => {
    expect(new Set(trees.map((tree) => tree.publicId)).size).toBe(trees.length);
    expect(trees.every((tree) => /^[0-9A-HJKMNP-TV-Z]{26}$/.test(tree.publicId))).toBe(true);
    expect(trees.length).toBeGreaterThanOrEqual(4);
  });
  it('every post references one existing tree and an attributed author', () => {
    for (const post of posts) {
      expect(getTree(post.treeId)).toBeDefined();
      expect(people.some((person) => person.id === post.authorId)).toBe(true);
      expect(getPost(post.id)).toEqual(post);
    }
    expect(new Set(posts.map((post) => post.id)).size).toBe(posts.length);
  });
  it('a growth photo belongs to the same permanent tree, not a second tree record', () => {
    const neem = trees[0];
    const updates = timelineForTree(neem.publicId);
    expect(updates.length).toBeGreaterThan(1);
    expect(new Set(updates.map((post) => post.treeId))).toEqual(new Set([neem.publicId]));
    expect(trees.filter((tree) => tree.publicId === neem.publicId)).toHaveLength(1);
  });
  it('feed uses publication time while a tree timeline uses observation time', () => {
    const feed = feedPosts();
    expect(feed.map((post) => post.publishedAt)).toEqual([...feed.map((post) => post.publishedAt)].sort().reverse());
    for (const tree of trees) {
      const timeline = timelineForTree(tree.publicId);
      expect(timeline.map((post) => post.observedAt)).toEqual([...timeline.map((post) => post.observedAt)].sort().reverse());
    }
    expect(posts.some((post) => post.observedAt.slice(0,10) !== post.publishedAt.slice(0,10))).toBe(true);
  });
  it('preserves unknown planting dates and does not invent precise GPS coordinates', () => {
    expect(trees.some((tree) => tree.plantedAt === null)).toBe(true);
    for (const tree of trees) {
      expect(tree).not.toHaveProperty('lat');
      expect(tree).not.toHaveProperty('lng');
      expect(tree).not.toHaveProperty('coordinates');
      expect(tree.locationLabel).toContain('approximate area');
      expect(tree.illustration.x).toBeGreaterThanOrEqual(0);
      expect(tree.illustration.x).toBeLessThanOrEqual(100);
      expect(tree.illustration.y).toBeGreaterThanOrEqual(0);
      expect(tree.illustration.y).toBeLessThanOrEqual(100);
    }
  });
  it('comments attach to valid posts and people', () => {
    for (const comment of comments) {
      expect(getPost(comment.postId)).toBeDefined();
      expect(people.some((person) => person.id === comment.authorId)).toBe(true);
      expect(commentsForPost(comment.postId)).toContain(comment);
    }
  });
  it('search and owner profiles derive consistently from source fixtures', () => {
    expect(searchTrees('lahore').length).toBeGreaterThan(0);
    expect(searchTrees('NeEm', 'Neem')).toHaveLength(1);
    expect(treesForPerson('u-ayesha').every((tree) => tree.registeredBy === 'u-ayesha')).toBe(true);
  });
});

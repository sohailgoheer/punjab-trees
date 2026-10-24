import { Bookmark, CalendarDays, Heart, MapPin, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TreePost } from '../types/models';
import { commentsForPost, displayDate, getPerson, getTree } from '../lib/collections';
import { Avatar } from './Avatar';
import { useDemo } from '../state/DemoContext';

export function PostCard({ post }: { post: TreePost }) {
  const tree = getTree(post.treeId);
  const person = getPerson(post.authorId);
  const { likedIds, savedIds, toggleLike, toggleSave, announce } = useDemo();
  if (!tree || !person) return null;

  const liked=likedIds.has(post.id),saved=savedIds.has(post.id);
  const share = async () => {
    const url = new URL(`#/posts/${post.id}`,window.location.href).href;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      announce('Demo post link copied. Only fictional information is shared.');
    } catch {
      announce('Copy this demo link from your browser address bar.');
    }
  };

  return <article className="post-card">
    <header className="post-top"><Avatar person={person}/><div className="post-identity"><Link to="/profile" className="author-name">{person.displayName}</Link><div className="post-subtitle">added a {post.kind === 'growth'?'growth update':post.kind==='planting'?'planting memory':'care note'} · {displayDate(post.publishedAt)}</div></div><button className="post-more" type="button" aria-label="More actions (demo)" onClick={()=>announce('More post actions will be connected in a later phase.')}><MoreHorizontal size={21}/></button></header>
    <div className="post-prologue"><Link className="tree-context" to={`/trees/${tree.publicId}`}><span>🌳</span> <strong>{tree.displayName}</strong><span className="arrow-text">View tree story ↗</span></Link><p>{post.text}</p></div>
    <Link className="post-photo-link" to={`/posts/${post.id}`} aria-label={`Open photo update for ${tree.displayName}`}><img src={post.image} alt={post.imageAlt} loading="lazy" onError={(e)=>{e.currentTarget.style.opacity='.12';}}/><span className="photo-note">Illustrative demo photo</span></Link>
    <div className="post-meta"><span><MapPin size={14}/> {tree.locationLabel}</span><span><CalendarDays size={14}/> Observed {displayDate(post.observedAt)}</span></div>
    <div className="reaction-summary"><span><Heart size={14} fill="#e38876" stroke="#e38876"/> {post.seedLikes + (liked?1:0)} demo likes</span><Link to={`/posts/${post.id}`}>{commentsForPost(post.id).length} comments</Link></div>
    <div className="post-actions"><button type="button" className={liked?'is-on':''} onClick={()=>toggleLike(post.id)} aria-pressed={liked}><Heart size={19} fill={liked?'currentColor':'none'}/> {liked?'Liked':'Like'}</button><Link to={`/posts/${post.id}`}><MessageCircle size={19}/> Comment</Link><button type="button" className={saved?'is-on':''} onClick={()=>toggleSave(post.id)} aria-pressed={saved}><Bookmark size={19} fill={saved?'currentColor':'none'}/> Save</button><button type="button" onClick={share}><Share2 size={19}/> Share</button></div>
  </article>;
}

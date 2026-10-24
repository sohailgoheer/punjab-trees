import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Heart, Leaf, MessageCircle, Send, MapPin } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { NoticeTag } from '../components/NoticeTag';
import { commentsForPost, displayDate, getPerson, getPost, getTree } from '../lib/collections';
import { useDemo } from '../state/DemoContext';
import { NotFoundPage } from './NotFoundPage';

export function PostPage(){
  const { postId }=useParams<{postId:string}>();
  const post=postId?getPost(postId):undefined;
  const [draft,setDraft]=useState('');
  const [previewComments,setPreviewComments]=useState<string[]>([]);
  const { likedIds,toggleLike,announce }=useDemo();
  if(!post)return <NotFoundPage/>;
  const tree=getTree(post.treeId),author=getPerson(post.authorId);
  if(!tree || !author)return <NotFoundPage/>;
  const original=commentsForPost(post.id);
  const liked=likedIds.has(post.id);

  const comment=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!draft.trim())return;
    setPreviewComments((old)=>[...old,draft.trim()]);
    setDraft('');
    announce('Your comment is a temporary UI preview, not saved to any server.');
  };
  return <div className="post-screen">
    <Link className="back-link" to={`/trees/${tree.publicId}`}><ArrowLeft size={17}/> Back to {tree.displayName}</Link>
    <section className="post-detail-top panel-surface"><div className="eyebrow">PHOTO UPDATE · <NoticeTag compact/></div><div className="post-detail-head"><Avatar person={author}/><div><strong>{author.displayName}</strong><p>Shared {displayDate(post.publishedAt)} · {post.kind} observation</p></div></div><h1 className="serif">{post.note}</h1><p className="post-detail-body">{post.text}</p><div className="detail-meta"><span><CalendarDays size={16}/> Observed {displayDate(post.observedAt)}</span><span><MapPin size={16}/> {tree.locationLabel}</span></div></section>
    <figure className="post-detail-photo"><img src={post.image} alt={post.imageAlt}/><figcaption>Illustrative demo imagery · Tree: <Link to={`/trees/${tree.publicId}`}>{tree.displayName}</Link></figcaption></figure>
    <section className="detail-discussion panel-surface" aria-labelledby="discussion-heading"><div className="discussion-header"><h2 id="discussion-heading" className="serif">A little conversation <span aria-hidden="true">💬</span></h2><button type="button" onClick={()=>toggleLike(post.id)} className={`secondary-button ${liked?'is-liked':''}`} aria-pressed={liked}><Heart size={18} fill={liked?'currentColor':'none'}/> {post.seedLikes+(liked?1:0)} demo likes</button></div>
      {original.length || previewComments.length ? <div className="comment-list">{original.map(c=>{const commenter=getPerson(c.authorId);return <div className="comment-row" key={c.id}><Avatar person={commenter} size="sm"/><div><strong>{commenter?.displayName}</strong><small>{displayDate(c.publishedAt)}</small><p>{c.body}</p></div></div>;})}{previewComments.map((text,index)=><div className="comment-row" key={index}><Avatar size="sm" person={getPerson('u-ayesha')}/><div><strong>Preview comment</strong><small>Not saved · this session only</small><p>{text}</p></div></div>)}</div> : <div className="soft-empty"><MessageCircle size={24}/><p>No fictional comments yet. Add a temporary example below.</p></div>}
      <form className="comment-composer" onSubmit={comment}><label htmlFor="comment-text">Add a demo comment</label><div><input id="comment-text" maxLength={260} required placeholder="A kind word for this tree..." value={draft} onChange={(e)=>setDraft(e.target.value)}/><button className="primary-button" type="submit"><Send size={16}/> Comment</button></div><small>Text stays in React memory only and disappears after refresh.</small></form>
      <Link to={`/trees/${tree.publicId}`} className="link-to-tree"><Leaf size={18}/> Return to the tree's full photo timeline <span>↗</span></Link>
    </section>
  </div>;
}

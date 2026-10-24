import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Camera, Leaf, MapPin, Sprout, UsersRound } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { NoticeTag } from '../components/NoticeTag';
import { PostCard } from '../components/PostCard';
import { people, posts } from '../data/fixtures';
import { displayDate, treesForPerson } from '../lib/collections';
import { useDemo } from '../state/DemoContext';

type ProfileTab='trees'|'updates'|'saved';
export function ProfilePage(){
  const [active,setActive]=useState<ProfileTab>('trees');
  const person=people[0],ownTrees=treesForPerson(person.id),ownPosts=posts.filter(p=>p.authorId===person.id).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
  const {savedIds}=useDemo();
  const savedPosts=posts.filter(p=>savedIds.has(p.id));
  return <div className="profile-screen">
    <div className="profile-cover"><div className="profile-leaf-circle"><Sprout size={65}/></div><span className="profile-cover-label">A greener journey, one tree at a time.</span></div>
    <section className="profile-info panel-surface"><div className="profile-main-info"><Avatar person={person} size="lg"/><div><span className="eyebrow">FICTIONAL COMMUNITY MEMBER</span><h1 className="serif">{person.displayName}</h1><p>{person.username} · <MapPin size={15}/> Lahore, Punjab (sample city)</p></div><NoticeTag compact/></div><p className="profile-bio">“I believe caring for a tree is a way of caring for the future. Here's a little visual diary of the green things around us.”</p><div className="profile-stat-row"><span><TreesForProfileIcon/> <strong>{ownTrees.length}</strong> Trees</span><span><Camera size={18}/> <strong>{ownPosts.length}</strong> Updates</span><span><UsersRound size={18}/> Fictional profile</span></div></section>
    <div className="profile-tabs" role="tablist" aria-label="Profile sections">
      {([{id:'trees',label:'My trees',icon:Leaf},{id:'updates',label:'Updates',icon:Camera},{id:'saved',label:'Saved posts',icon:Bookmark}] as const).map(({id,label,icon:Icon})=><button type="button" key={id} role="tab" aria-selected={active===id} className={active===id?'profile-tab is-active':'profile-tab'} onClick={()=>setActive(id)}><Icon size={18}/>{label}</button>)}
    </div>
    {active==='trees' && <div className="profile-tree-grid">{ownTrees.map(tree=><Link key={tree.publicId} to={`/trees/${tree.publicId}`} className="profile-tree"><img src={tree.image} alt={tree.imageAlt}/><div><small>{tree.species} · {tree.city}</small><strong>{tree.displayName}</strong><span>First seen {displayDate(tree.firstObservedAt)} <ArrowRight size={15}/></span></div></Link>)}</div>}
    {active==='updates' && <div className="feed-list profile-posts">{ownPosts.map(post=><PostCard key={post.id} post={post}/>)}</div>}
    {active==='saved' && (savedPosts.length ? <div className="feed-list profile-posts">{savedPosts.map(post=><PostCard key={post.id} post={post}/>)}</div>:<div className="empty-state panel-surface"><Bookmark size={28}/><h3>No saved demo posts</h3><p>Tap Save on any post in the feed. Saved items stay visible only until a page refresh.</p><Link className="secondary-button" to="/">Explore the feed <ArrowRight size={16}/></Link></div>)}
  </div>;
}
function TreesForProfileIcon(){return <Sprout size={18}/>;}

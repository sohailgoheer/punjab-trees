import { useState } from 'react';
import { ArrowRight, Camera, ChevronDown, Compass, Leaf, Plus, Sparkles, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { NoticeTag } from '../components/NoticeTag';
import { PostCard } from '../components/PostCard';
import { people, trees } from '../data/fixtures';
import { feedPosts } from '../lib/collections';
import { useDemo } from '../state/DemoContext';
import type { ObservationKind } from '../types/models';

type FeedFilter = 'all' | ObservationKind;
const labels: Array<{id:FeedFilter; label:string}> = [
  {id:'all',label:'All moments'},{id:'growth',label:'Growth photos'},{id:'planting',label:'New plantings'},{id:'care',label:'Care notes'},
];

export function HomePage(){
  const [filter,setFilter] = useState<FeedFilter>('all');
  const [tab,setTab] = useState<'latest'|'following'>('latest');
  const [visibleCount,setVisibleCount] = useState(5);
  const { followedTreeIds } = useDemo();

  const posts = feedPosts().filter((post) => (filter==='all'||post.kind===filter) && (tab==='latest'||followedTreeIds.has(post.treeId)));
  const shown=posts.slice(0,visibleCount);
  const first=trees[0];

  return <div className="page-home">
    <section className="welcome-banner" aria-label="TreeStory community welcome">
      <div className="welcome-copy"><span className="welcome-kicker"><Sparkles size={14}/> YOUR GREEN CORNER OF THE WORLD</span><h1>Every tree holds <em>a story worth growing.</em></h1><p>Little moments. New leaves. Stories that grow with time. Discover a greener Punjab, one tree at a time.</p><Link className="hero-cta" to="/add-tree"><Plus size={17}/> Share a tree story <ArrowRight size={16}/></Link></div>
      <div className="welcome-illustration" aria-hidden="true"><span className="banner-orb orb-one"/><span className="banner-orb orb-two"/><span className="hero-tree">🌳</span><span className="banner-floating"><Sprout size={16}/> Growing together</span></div>
    </section>

    <section className="highlight-stories" aria-labelledby="featured-heading"><div className="mini-section-heading"><h2 id="featured-heading">Growing journeys</h2><Link to="/explore">Explore all <ArrowRight size={15}/></Link></div>
      <div className="story-mini-grid">{trees.slice(0,3).map((tree)=><Link className="story-mini-card" key={tree.publicId} to={`/trees/${tree.publicId}`}><img src={tree.image} alt={tree.imageAlt} loading="lazy"/><span className="story-mini-shade"/><div className="story-mini-content"><small>{tree.species} · {tree.city}</small><strong>{tree.displayName}</strong></div></Link>)}</div>
    </section>

    <section className="composer-card"><Avatar person={people[0]}/><div className="composer-body"><span className="composer-greeting">Hello, Ayesha <span className="muted-demo">(fictional account)</span></span><Link className="composer-prompt" to="/add-tree">What's happening with your trees today?</Link></div><Link to="/add-tree" className="composer-photo"><Camera size={19}/> <span>Add story</span></Link></section>

    <section className="feed-section" aria-labelledby="feed-heading">
      <div className="feed-heading"><div><span className="eyebrow">THE COMMUNITY FEED</span><h2 id="feed-heading">Stories from the ground <span aria-hidden="true">🌱</span></h2></div><NoticeTag compact/></div>
      <div className="feed-controls"><div className="tabs" role="tablist" aria-label="Feed view"><button type="button" role="tab" aria-selected={tab==='latest'} className={tab==='latest'?'tab is-active':'tab'} onClick={()=>{setTab('latest');setVisibleCount(5);}}>Latest stories</button><button type="button" role="tab" aria-selected={tab==='following'} className={tab==='following'?'tab is-active':'tab'} onClick={()=>{setTab('following');setVisibleCount(5);}}>Following ({followedTreeIds.size})</button></div></div>
      <div className="filter-list" aria-label="Filter posts by type">{labels.map((item)=><button key={item.id} className={filter===item.id?'filter-pill is-active':'filter-pill'} type="button" aria-pressed={filter===item.id} onClick={()=>{setFilter(item.id);setVisibleCount(5);}}>{item.label}</button>)}</div>
      {shown.length ? <div className="feed-list">{shown.map((post)=><PostCard key={post.id} post={post}/>)}</div> :
        <div className="empty-state panel-surface"><Leaf size={33}/><h3>No stories in this view yet</h3><p>{tab==='following'?'Follow a demo tree from its profile, then return here to see its updates.':'Try another filter to discover more tree memories.'}</p><Link className="secondary-button" to="/explore"><Compass size={16}/> Find a tree</Link></div>}
      {visibleCount < posts.length && <button type="button" className="load-more" onClick={()=>setVisibleCount((count)=>count+5)}>Load more stories <ChevronDown size={18}/></button>}
      <p className="below-feed-note">All updates and images on this page are fictional examples. Actions reset on refresh.</p>
    </section>
    <div className="home-footer-tip"><span>🌳</span><div><strong>One real tree. A lifelong record.</strong><p>In the finished product, each growth photo will stay connected to the same tree profile.</p></div><Link to={`/trees/${first.publicId}`} className="text-link">See the journey <ArrowRight size={16}/></Link></div>
  </div>;
}

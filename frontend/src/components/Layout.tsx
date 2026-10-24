import { useState, type ReactNode, type FormEvent } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bell, Bookmark, Compass, Home, Leaf, MapPinned, Menu, Plus, Search, Settings2, Sparkles, Trees, UserRound, UsersRound, X } from 'lucide-react';
import { Avatar } from './Avatar';
import { NoticeTag } from './NoticeTag';
import { people, trees, posts, notifications } from '../data/fixtures';
import { countBySpecies } from '../lib/collections';
import { useDemo } from '../state/DemoContext';

const navItems = [
  { to:'/',label:'Home feed',icon: Home,end:true },
  { to:'/explore',label:'Explore trees',icon: Compass,end:false },
  { to:'/add-tree',label:'Plant a tree',icon: Plus,end:false },
  { to:'/profile',label:'My profile',icon: UserRound,end:false },
  { to:'/notifications',label:'Notifications',icon: Bell,end:false },
] as const;

function Header() {
  const [query, setQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();
  const { readNotificationIds } = useDemo();
  const unreadCount = notifications.filter((n) => !readNotificationIds.has(n.id)).length;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    setMobileSearch(false);
  };
  return <header className="header">
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="TreeStory home"><span className="brand-mark"><Trees size={24} strokeWidth={2.4}/></span><span className="brand-name"><strong>TreeStory</strong><small>growing together</small></span></Link>
      <form className={`global-search${mobileSearch ? ' is-open' : ''}`} onSubmit={submit} role="search">
        <Search size={19} aria-hidden="true"/>
        <label className="sr-only" htmlFor="global-search">Search fictional trees</label>
        <input id="global-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search trees, places, species..." />
        <kbd>↵</kbd>
      </form>
      <div className="header-actions">
        <NoticeTag compact/>
        <button className="icon-button mobile-search-toggle" aria-label={mobileSearch ? 'Close search' : 'Open search'} onClick={() => setMobileSearch(!mobileSearch)} type="button">{mobileSearch ? <X size={20}/> : <Search size={20}/>}</button>
        <Link to="/add-tree" className="primary-button header-add"><Plus size={18}/> Add a tree</Link>
        <Link to="/notifications" className="icon-button notification-btn" aria-label={`Notifications, ${unreadCount} unread`}><Bell size={21}/>{unreadCount > 0 && <span className="notification-dot"/>}</Link>
        <Link className="header-person" to="/profile" aria-label="Open fictional profile"><Avatar person={people[0]} size="sm"/></Link>
      </div>
    </div>
  </header>;
}
function LeftNav() {
  return <aside className="left-rail" aria-label="Sidebar navigation">
    <nav className="navigation-card">
      <div className="rail-overline">MAIN MENU</div>
      {navItems.map(({ to,label,icon:Icon,end }) => <NavLink end={end} key={to} className={({isActive})=> `side-nav-item${isActive?' is-active':''}`} to={to}><Icon size={19}/>{label}{label==='Notifications' && <span className="nav-dot"/>}</NavLink>)}
      <div className="side-divider"/>
      <div className="rail-overline">DISCOVER</div>
      <Link className="side-nav-item" to="/explore"><MapPinned size={19}/> Tree map <span className="mini-label">preview</span></Link>
      <Link className="side-nav-item" to="/profile"><Bookmark size={19}/> Saved posts <span className="mini-label">demo</span></Link>
      <Link className="side-nav-item" to="/profile"><UsersRound size={19}/> Community <span className="mini-label">demo</span></Link>
      <Link className="side-nav-item" to="/profile"><Settings2 size={19}/> Settings <span className="mini-label">later</span></Link>
    </nav>
    <div className="rail-inspiration">
      <div className="rail-art"><Leaf size={37}/><span className="rail-halo"/></div>
      <h3>Every tree has a story.</h3>
      <p>Small beginnings today, greener memories tomorrow.</p>
      <Link to="/add-tree">Start your story <span>↗</span></Link>
    </div>
    <p className="sidebar-footnote">Phase 01 · Interactive UI preview<br/>No real accounts or data</p>
  </aside>;
}
function RightRail() {
  const { followedTreeIds } = useDemo();
  const counts = countBySpecies().slice(0,3);
  const activity = [posts[0],posts[1],posts[2]];
  return <aside className="right-rail" aria-label="Community sidebar">
    <div className="rail-panel rail-stats">
      <div className="rail-panel-head"><div><span className="rail-overline">OUR LITTLE FOREST</span><h3>Community snapshot</h3></div><Sparkles size={18} color="#477e5c"/></div>
      <NoticeTag compact/>
      <div className="stats-grid">
        <div><strong>{trees.length.toString().padStart(2,'0')}</strong><span>Tree profiles</span></div>
        <div><strong>{posts.length}</strong><span>Photo moments</span></div>
        <div><strong>{people.length}</strong><span>Gardeners</span></div>
        <div><strong>{followedTreeIds.size}</strong><span>Following in demo</span></div>
      </div>
      <p className="rail-hint">Counts come only from fictional fixtures and this browser session.</p>
    </div>
    <div className="rail-panel">
      <div className="rail-panel-head"><h3>Popular tree types</h3><Leaf size={17} color="#619b71"/></div>
      <div className="species-list">{counts.map(({species,count},i)=><div key={species} className="species-row"><span className={`species-emoji species-emoji--${i}`}>{['🌳','🌿','🌱'][i]}</span><div><strong>{species}</strong><small>{count} fictional profile{count === 1 ? '' : 's'}</small></div><span className="species-bar"><span style={{width:`${Math.max(28,count/trees.length*100)}%`}}/></span></div>)}</div>
      <Link to="/explore" className="text-link rail-more">See all trees ↗</Link>
    </div>
    <div className="rail-panel">
      <div className="rail-panel-head"><h3>Recent moments</h3><span className="new-label">Demo</span></div>
      <div className="activity-list">{activity.map((post)=>{const tree=trees.find(t=>t.publicId===post.treeId);return <Link to={`/posts/${post.id}`} className="activity-row" key={post.id}><span className="activity-icon"><Leaf size={16}/></span><div><strong>{tree?.displayName}</strong><small>New chapter in the timeline</small></div></Link>;})}</div>
    </div>
    <div className="care-tip"><span className="tip-leaf">☘</span><small>TREE CARE NOTE</small><h3>A little attention goes a long way.</h3><p>Observe changes regularly, keep a dated record, and avoid making health claims from a photo alone.</p></div>
  </aside>;
}
function MobileNav() {
  const items = [
    {to:'/',label:'Home',icon:Home},
    {to:'/explore',label:'Explore',icon:Compass},
    {to:'/add-tree',label:'Add',icon:Plus},
    {to:'/notifications',label:'Activity',icon:Bell},
    {to:'/profile',label:'Profile',icon:UserRound},
  ];
  return <nav aria-label="Mobile navigation" className="mobile-tabs">{items.map(({to,label,icon:Icon})=><NavLink key={to} end={to==='/'} to={to} className={({isActive})=>`mobile-tab${isActive?' is-active':''}`}><Icon size={21}/><span>{label}</span></NavLink>)}</nav>;
}
export function Layout({children}:{children:ReactNode}){
  const [menuOpen,setMenuOpen]=useState(false);
  return <><Header/><div className="site-shell">
    <div className="mobile-intro-bar"><span><Leaf size={15}/> A little greener, together.</span><button type="button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle full navigation" aria-expanded={menuOpen}><Menu size={17}/></button></div>
    {menuOpen && <div className="mobile-menu"><LeftNav/></div>}
    <div className="site-grid"><LeftNav/><main id="main-content" className="main-column" tabIndex={-1}>{children}</main><RightRail/></div>
  </div><MobileNav/><footer className="global-footer">TreeStory is a working title · Phase 01 frontend demo · All people, trees and locations are fictional · <Link to="/explore">Explore responsibly</Link></footer></>;
}

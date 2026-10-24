import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Camera, Check, Clock3, Leaf, MapPin, Plus, ShieldCheck, Sprout } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { NoticeTag } from '../components/NoticeTag';
import { SectionTitle } from '../components/SectionTitle';
import { getPerson, getTree, displayDate, timelineForTree } from '../lib/collections';
import { useDemo } from '../state/DemoContext';
import { NotFoundPage } from './NotFoundPage';

export function TreePage(){
  const { publicId } = useParams<{publicId:string}>();
  const tree = publicId ? getTree(publicId) : undefined;
  const [selectedImageId,setSelectedImageId]=useState<string|null>(null);
  const { followedTreeIds, toggleFollow } = useDemo();
  if(!tree) return <NotFoundPage/>;
  const timeline=timelineForTree(tree.publicId);
  const imagePost=timeline.find((post)=>post.id===selectedImageId) ?? timeline[0];
  const caretaker=getPerson(tree.registeredBy);
  const isFollowed=followedTreeIds.has(tree.publicId);

  return <div className="tree-screen">
    <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to community feed</Link>
    <SectionTitle eyebrow="ONE TREE · ONE LIVING PROFILE" title={tree.displayName} action={<NoticeTag compact/>}/>
    <div className="tree-hero-image"><img src={tree.image} alt={tree.imageAlt}/><span className="tree-cover-label"><Sprout size={15}/> {tree.status}</span><span className="cover-credit">Illustrative stock photo</span></div>
    <section className="tree-summary-panel"><div className="tree-intro-row"><div><span className="species-chip"><Leaf size={14}/>{tree.species}</span><h2 className="serif">A little greener, every season.</h2><p>{tree.summary}</p></div><button className={isFollowed?'secondary-button is-following':'primary-button'} type="button" onClick={()=>toggleFollow(tree.publicId)} aria-pressed={isFollowed}>{isFollowed?<><Check size={17}/> Following (demo)</>:<><Plus size={17}/> Follow this tree</>}</button></div>
      <div className="tree-facts">
        <div><CalendarDays size={18}/><span>Planted on</span><strong>{displayDate(tree.plantedAt)}</strong></div>
        <div><Clock3 size={18}/><span>First observed</span><strong>{displayDate(tree.firstObservedAt)}</strong></div>
        <div><Camera size={18}/><span>Photo updates</span><strong>{timeline.length} moments</strong></div>
        <div><MapPin size={18}/><span>Broad location</span><strong>{tree.city} area</strong></div>
      </div>
      <div className="tree-guardian"><Avatar person={caretaker}/><span><small>Registered by (fictional)</small><strong>{caretaker?.displayName ?? 'Community gardener'}</strong></span><span className="privacy-bubble"><ShieldCheck size={15}/> Precise GPS hidden</span></div>
      <div className="tree-id"><strong>Permanent tree ID (demo)</strong><code>{tree.publicId}</code></div>
    </section>

    <section className="timeline-section" aria-labelledby="timeline-title"><div className="section-heading-inline"><div><span className="eyebrow">CHAPTER BY CHAPTER</span><h2 id="timeline-title" className="serif">The growth timeline</h2><p>Photos arranged by when the observation happened, not when someone posted it.</p></div><Link className="secondary-button" to={`/add-tree?update=${tree.publicId}`}><Plus size={17}/> Add an update</Link></div>
      <div className="timeline-feature"><div className="comparison-image"><img src={imagePost.image} alt={imagePost.imageAlt}/><span className="photo-note">Illustrative demo photo</span></div><div className="comparison-caption"><span className="eyebrow">SELECTED MEMORY</span><h3>{imagePost.note}</h3><p><CalendarDays size={15}/> Observed on {displayDate(imagePost.observedAt)}</p><Link className="text-link" to={`/posts/${imagePost.id}`}>Open this update <ArrowRight size={15}/></Link></div></div>
      <div className="timeline-list">{timeline.map((post,index)=><button className={`timeline-entry${imagePost.id===post.id?' is-selected':''}`} type="button" key={post.id} onClick={()=>setSelectedImageId(post.id)} aria-pressed={imagePost.id===post.id}><span className="timeline-stem"><span className="timeline-node"/></span><img src={post.image} alt="" loading="lazy"/><span className="timeline-copy"><small>{displayDate(post.observedAt)} · {post.kind}</small><strong>{post.note}</strong><em>{index===0?'Latest observation':'View this moment'}</em></span><ArrowRight size={17}/></button>)}</div>
      <div className="privacy-strip"><ShieldCheck size={19}/><span>This location is shown only as a broad area in demo content. Exact home coordinates will never be exposed by default.</span></div>
    </section>
  </div>;
}

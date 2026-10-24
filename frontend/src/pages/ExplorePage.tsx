import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Compass, Leaf, MapPin, Search, ShieldCheck, SlidersHorizontal, Trees } from 'lucide-react';
import { NoticeTag } from '../components/NoticeTag';
import { SectionTitle } from '../components/SectionTitle';
import { searchTrees } from '../lib/collections';
import { trees } from '../data/fixtures';
import type { Species } from '../types/models';

export function ExplorePage(){
  const [params,setParams]=useSearchParams();
  const query=params.get('q')??'';
  const [species,setSpecies]=useState<Species|'All'>('All');
  const matches=searchTrees(query,species);
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const selected=matches.find((tree)=>tree.publicId===selectedId)??matches[0];

  return <div className="explore-screen">
    <SectionTitle eyebrow="DISCOVER OUR GREEN STORIES" title="Explore tree stories" description="Browse fictional trees by species and broad city. Map positions below are decorative, not real coordinates." action={<NoticeTag compact/>}/>
    <div className="explore-controls panel-surface"><label htmlFor="explore-search"><Search size={18}/><input id="explore-search" value={query} placeholder="Try Neem, Multan, or school..." onChange={(e)=>setParams(e.target.value?{q:e.target.value}:{}, {replace:true})}/></label><label className="explore-select"><SlidersHorizontal size={18}/><span className="sr-only">Species filter</span><select value={species} onChange={(e)=>setSpecies(e.target.value as Species|'All')}><option value="All">All species</option>{[...new Set(trees.map(t=>t.species))].map(spec=><option value={spec} key={spec}>{spec}</option>)}</select></label></div>
    <div className="map-intro"><span><ShieldCheck size={17}/> Privacy-first exploration</span><span>{matches.length} fictional tree{matches.length===1?'':'s'}</span></div>
    <div className="illustrated-map" role="group" aria-label="Illustrative tree explorer, not a georeferenced map">
      <div className="map-hill hill-a"/><div className="map-hill hill-b"/><div className="map-hill hill-c"/>
      <svg className="map-paths" viewBox="0 0 900 540" preserveAspectRatio="none" aria-hidden="true"><path d="M0 205 C 140 290, 220 120, 380 198 S 700 220, 900 100"/><path d="M180 -20 C 310 140, 215 375, 450 560"/><path d="M690 -20 C 550 170, 850 270, 740 570"/></svg>
      <span className="map-place place-north">NORTHERN GARDENS</span><span className="map-place place-south">SOUTHERN GROVES</span><span className="map-water">◌</span>
      {matches.map(tree=><button key={tree.publicId} type="button" className={`map-marker${selected?.publicId===tree.publicId?' is-selected':''}`} style={{left:`${tree.illustration.x}%`,top:`${tree.illustration.y}%`}} aria-label={`View ${tree.displayName}, ${tree.city}`} aria-pressed={selected?.publicId===tree.publicId} onClick={()=>setSelectedId(tree.publicId)}><Trees size={17}/></button>)}
      {selected && <div className="map-info"><img src={selected.image} alt={selected.imageAlt}/><div><small>SELECTED FICTIONAL TREE</small><strong>{selected.displayName}</strong><p>{selected.city} · {selected.species}</p><Link to={`/trees/${selected.publicId}`}>Open profile <ArrowRight size={14}/></Link></div></div>}
      {!matches.length && <div className="map-no-results">No matching sample markers</div>}
    </div>
    <p className="map-disclaimer"><MapPin size={15}/> This is a stylized, non-geographic map illustration. No GPS permission or real location data is used. A real privacy-safe Leaflet map belongs to Phase 06.</p>
    <div className="explore-heading"><div><span className="eyebrow">DISCOVER BY STORY</span><h2 className="serif">Trees in this view</h2></div><span className="result-label"><Compass size={15}/> {matches.length} profiles</span></div>
    {matches.length?<div className="explore-results">{matches.map(tree=><Link to={`/trees/${tree.publicId}`} className="explore-result" key={tree.publicId}><img src={tree.image} alt={tree.imageAlt} loading="lazy"/><div><strong>{tree.displayName}</strong><span>{tree.species} · {tree.city}</span><small>{tree.status}</small></div><ArrowRight size={18}/></Link>)}</div>:<div className="empty-state panel-surface"><Leaf size={26}/><h3>No trees match these filters</h3><p>Try another city or species. Everything here is fictional demo content.</p><button type="button" className="secondary-button" onClick={()=>{setParams({});setSpecies('All');}}>Clear filters</button></div>}
  </div>;
}

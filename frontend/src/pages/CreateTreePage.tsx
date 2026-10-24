import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Camera, Check, CloudUpload, Info, Leaf, MapPin, ShieldCheck, Sprout, Trees } from 'lucide-react';
import { NoticeTag } from '../components/NoticeTag';
import { SectionTitle } from '../components/SectionTitle';
import { getTree } from '../lib/collections';
import { trees } from '../data/fixtures';
import type { Species } from '../types/models';

type EntryMode = 'new' | 'existing' | 'update';
type Visibility = 'approximate' | 'hidden';
interface Draft {
  mode: EntryMode; title: string; species:Species; city:string;
  observedAt:string; plantedAt:string; description:string; privacy:Visibility;
  treeId:string; fileName:string;
}
const initial: Draft = {
  mode:'new',title:'',species:'Unknown',city:'',observedAt:'',plantedAt:'',description:'',
  privacy:'approximate',treeId:trees[0].publicId,fileName:'',
};
export function CreateTreePage(){
  const [params]=useSearchParams();
  const requestedTree=params.get('update');
  const chosen=getTree(requestedTree??'');
  const [draft,setDraft]=useState<Draft>(()=>({
    ...initial,
    mode:chosen?'update':'new',
    treeId:chosen?.publicId??trees[0].publicId,
  }));
  const [preview,setPreview]=useState<Draft|null>(null);
  const update=<K extends keyof Draft>(key:K,value:Draft[K])=>{setDraft((current)=>({...current,[key]:value}));setPreview(null);};
  const chosenTree=getTree(draft.treeId);
  const isUpdate=draft.mode==='update';
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!draft.observedAt || (!isUpdate && !draft.title.trim()))return;
    setPreview({...draft});
  };
  return <div className="create-screen">
    <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to the feed</Link>
    <SectionTitle eyebrow="YOUR NEXT GREEN CHAPTER" title={isUpdate?'Add a growth moment':'Start a tree story'} description={isUpdate?'Preview an observation that will belong to an existing tree. Nothing is saved yet.':'Every green story starts somewhere. Explore the future registration flow with demo-only inputs.'} action={<NoticeTag compact/>}/>
    <div className="create-hero-note"><div className="create-icon"><Sprout size={27}/></div><div><strong>Every planted tree deserves its own profile.</strong><p>Register once, then return for dated updates over the years. All fields below are a UI-only demonstration.</p></div></div>

    <div className="creation-types" role="group" aria-label="Choose a tree workflow">
      <button type="button" className={draft.mode==='new'?'creation-type is-selected':'creation-type'} aria-pressed={draft.mode==='new'} onClick={()=>update('mode','new')}><Sprout size={22}/><strong>Newly planted</strong><small>Create a profile for a new tree</small></button>
      <button type="button" className={draft.mode==='existing'?'creation-type is-selected':'creation-type'} aria-pressed={draft.mode==='existing'} onClick={()=>update('mode','existing')}><Trees size={22}/><strong>Existing tree</strong><small>Planting date can be unknown</small></button>
      <button type="button" className={draft.mode==='update'?'creation-type is-selected':'creation-type'} aria-pressed={draft.mode==='update'} onClick={()=>update('mode','update')}><Camera size={22}/><strong>Growth update</strong><small>Same tree, one more photo</small></button>
    </div>

    <form className="tree-form" onSubmit={submit}>
      {isUpdate?<section className="form-panel"><h2><span>01</span> Select an existing tree</h2><div className="form-field"><label htmlFor="target-tree">Which tree is this update for? <em>*</em></label><select id="target-tree" required value={draft.treeId} onChange={(e)=>update('treeId',e.target.value)}>{trees.map(t=><option value={t.publicId} key={t.publicId}>{t.displayName} · {t.city}</option>)}</select><small>The same permanent tree ID is preserved for every future update.</small></div>{chosenTree&&<div className="selected-tree"><img src={chosenTree.image} alt={chosenTree.imageAlt}/><div><strong>{chosenTree.displayName}</strong><small>{chosenTree.species} · {chosenTree.city}</small><code>{chosenTree.publicId}</code></div><Check size={18}/></div>}</section>:
      <section className="form-panel"><h2><span>01</span> About the tree</h2><div className="form-field"><label htmlFor="tree-name">Give this tree a name <em>*</em></label><input id="tree-name" required maxLength={65} placeholder="e.g. The Neem by Our Gate" value={draft.title} onChange={(e)=>update('title',e.target.value)}/><small>You can always use a simple friendly name for your tree.</small></div><div className="form-field-row"><div className="form-field"><label htmlFor="tree-species">Tree species</label><select id="tree-species" value={draft.species} onChange={(e)=>update('species',e.target.value as Species)}><option value="Unknown">Unknown / Not sure</option><option value="Neem">Neem</option><option value="Amaltas">Amaltas</option><option value="Peepal">Peepal</option><option value="Kachnar">Kachnar</option><option value="Jamun">Jamun</option><option value="Moringa">Moringa</option></select></div><div className="form-field"><label htmlFor="city">Broad city / area</label><input id="city" placeholder="e.g. Lahore" maxLength={45} value={draft.city} onChange={(e)=>update('city',e.target.value)}/></div></div></section>}

      <section className="form-panel"><h2><span>{isUpdate?'02':'02'}</span> Photo & observation</h2><div className="form-field-row"><div className="form-field"><label htmlFor="observed-date">Photo / observation date <em>*</em></label><div className="field-with-icon"><CalendarDays size={18}/><input id="observed-date" type="date" required value={draft.observedAt} onChange={(e)=>update('observedAt',e.target.value)}/></div></div>{!isUpdate&&<div className="form-field"><label htmlFor="planted-date">Planting date (if known)</label><div className="field-with-icon"><CalendarDays size={18}/><input id="planted-date" type="date" value={draft.plantedAt} onChange={(e)=>update('plantedAt',e.target.value)}/></div><small>Leave empty if you don't know the date.</small></div>}</div>
      <div className="form-field"><label htmlFor="photo-file">Choose a photo (optional demo selection)</label><label className="photo-drop" htmlFor="photo-file"><CloudUpload size={29}/><strong>{draft.fileName||'Choose an example photo file'}</strong><small>Filename preview only · no bytes uploaded, no EXIF read</small><span>Browse a local file</span></label><input className="file-input" type="file" id="photo-file" accept="image/*" onChange={(e)=>update('fileName',e.target.files?.[0]?.name??'')}/></div>
      <div className="form-field"><label htmlFor="tree-description">{isUpdate?'What changed?':'Tell us the tree story'}</label><textarea id="tree-description" rows={4} maxLength={400} placeholder={isUpdate?'New branches, extra care, season change...':'Why did you plant or adopt this tree?'} value={draft.description} onChange={(e)=>update('description',e.target.value)}/></div></section>

      {!isUpdate&&<section className="form-panel"><h2><span>03</span> Location & privacy</h2><div className="location-explainer"><MapPin size={19}/><div><strong>Location without oversharing</strong><p>This prototype asks for a broad city only. It never requests your device's GPS coordinates.</p></div></div><fieldset className="privacy-choices"><legend>Future public map visibility</legend><label className={draft.privacy==='approximate'?'privacy-choice is-selected':'privacy-choice'}><input type="radio" name="privacy" value="approximate" checked={draft.privacy==='approximate'} onChange={()=>update('privacy','approximate')}/><div><strong>Approximate public area</strong><small>Future pins will be generalized for privacy</small></div></label><label className={draft.privacy==='hidden'?'privacy-choice is-selected':'privacy-choice'}><input type="radio" name="privacy" value="hidden" checked={draft.privacy==='hidden'} onChange={()=>update('privacy','hidden')}/><div><strong>Keep location hidden</strong><small>No public marker will be displayed</small></div></label></fieldset></section>}

      <div className="form-end"><div><ShieldCheck size={19}/><p><strong>Safe design preview.</strong><br/>No real account, photo, GPS point or database record will be created.</p></div><button className="primary-button" type="submit"><Leaf size={18}/> Preview {isUpdate?'update':'tree'} <ArrowRight size={17}/></button></div>
    </form>

    {preview && <section className="form-preview panel-surface" role="status" aria-live="polite"><div className="preview-success"><Check size={18}/><span>UI preview prepared · Not saved</span></div><h2 className="serif">{preview.mode==='update'?`Growth moment for ${getTree(preview.treeId)?.displayName}`:preview.title}</h2><p>{preview.description||'A small step towards a greener story.'}</p><div className="preview-facts"><span><CalendarDays size={15}/> Observed {preview.observedAt}</span><span><MapPin size={15}/> {preview.city || getTree(preview.treeId)?.city || 'Location omitted'}</span><span><Camera size={15}/> {preview.fileName||'No photo selected'}</span></div><p className="preview-warning"><Info size={16}/> This is only a visual confirmation. It does not create a tree ID, upload media, or save anything. Real registration begins in Phase 03.</p><Link className="text-link" to="/explore">Explore existing demo tree profiles <ArrowRight size={16}/></Link></section>}
  </div>;
}

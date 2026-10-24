import { Bell, Camera, CheckCheck, Heart, Leaf, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NoticeTag } from '../components/NoticeTag';
import { SectionTitle } from '../components/SectionTitle';
import { notifications } from '../data/fixtures';
import { displayDate } from '../lib/collections';
import { useDemo } from '../state/DemoContext';

const icons={camera:Camera,heart:Heart,leaf:Leaf,message:MessageCircle};
export function NotificationsPage(){
  const {readNotificationIds,markRead,markAllRead}=useDemo();
  const unread=notifications.filter(n=>!readNotificationIds.has(n.id)).length;
  return <div className="notifications-screen">
    <SectionTitle eyebrow="COMMUNITY MOMENTS" title="Your activity" description="A preview of how your tree community could keep you up to date." action={<NoticeTag compact/>}/>
    <div className="notifications-toolbar"><div><Bell size={19}/><strong>{unread} unread</strong><span>in this fictional session</span></div><button className="secondary-button" type="button" onClick={()=>markAllRead(notifications.map(n=>n.id))}><CheckCheck size={17}/> Mark all as read</button></div>
    <div className="notifications-list">{notifications.map((notice)=>{const Icon=icons[notice.icon];const to=notice.postId?`/posts/${notice.postId}`:notice.treeId?`/trees/${notice.treeId}`:'/explore';const unread=!readNotificationIds.has(notice.id);
      return <div className={`notification-item${unread?' is-unread':''}`} key={notice.id}><span className="notification-icon"><Icon size={20}/></span><div className="notification-content"><Link to={to} onClick={()=>markRead(notice.id)}><strong>{notice.title}</strong><ArrowRight size={15}/></Link><p>{notice.body}</p><small>{displayDate(notice.createdAt)} · Sample activity</small></div>{unread&&<button className="unread-switch" type="button" aria-label={`Mark ${notice.title} as read`} onClick={()=>markRead(notice.id)}><span className="unread-indicator"/></button>}</div>})}</div>
    <div className="notification-footer-note"><Leaf size={17}/> No real notifications, push messages or user accounts are connected in Phase 01. Read/unread actions reset on refresh.</div>
  </div>;
}

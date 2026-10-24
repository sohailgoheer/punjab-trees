import { ArrowLeft, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage(){
  return <section className="empty-state panel-surface"><Trees size={42}/><h1>That trail ends here.</h1><p>This demo page does not exist. Pick another tree story.</p><Link className="primary-button" to="/"><ArrowLeft size={17}/> Back to the feed</Link></section>;
}

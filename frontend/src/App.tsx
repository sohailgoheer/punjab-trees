import { HashRouter, Route, Routes } from 'react-router-dom';
import { DemoProvider } from './state/DemoContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TreePage } from './pages/TreePage';
import { CreateTreePage } from './pages/CreateTreePage';
import { ExplorePage } from './pages/ExplorePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { PostPage } from './pages/PostPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Hash-based React Router keeps shareable demo deep links working on branch-based
// GitHub Pages without server rewrites. Production routing can be reviewed later.
export function AppRoutes() {
  return <DemoProvider><Layout><Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/explore" element={<ExplorePage/>}/>
    <Route path="/add-tree" element={<CreateTreePage/>}/>
    <Route path="/trees/:publicId" element={<TreePage/>}/>
    <Route path="/posts/:postId" element={<PostPage/>}/>
    <Route path="/profile" element={<ProfilePage/>}/>
    <Route path="/notifications" element={<NotificationsPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes></Layout></DemoProvider>;
}
export default function App() { return <HashRouter><AppRoutes/></HashRouter>; }

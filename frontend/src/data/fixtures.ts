import type { Notice, Person, TreeComment, TreePost, TreeRecord } from '../types/models';

// FICTIONAL PHASE 01 FIXTURES: no real people, private GPS points, activity or uploaded media.
// Photo URLs are illustrative stock imagery, not verified individual tree observations.
const image = (id: string, w = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const people: Person[] = [
  { id: 'u-ayesha', displayName: 'Ayesha Malik', username: '@ayeshagrows', initials: 'AM', color: '#dfc99e', subtitle: 'Tree caretaker · Lahore' },
  { id: 'u-ali', displayName: 'Ali Raza', username: '@ali.plants', initials: 'AR', color: '#c6dcc2', subtitle: 'Nature volunteer · Multan' },
  { id: 'u-sana', displayName: 'Sana Noor', username: '@sananoor', initials: 'SN', color: '#e8ccdb', subtitle: 'Community gardener · Lahore' },
  { id: 'u-hamza', displayName: 'Hamza Farooq', username: '@hamza.green', initials: 'HF', color: '#d7d4b4', subtitle: 'School eco club · Bahawalpur' },
  { id: 'u-mariam', displayName: 'Mariam Zafar', username: '@mariamnature', initials: 'MZ', color: '#c7dce7', subtitle: 'Urban gardener · Faisalabad' },
  { id: 'u-noor', displayName: 'Noor Akhtar', username: '@noorplanting', initials: 'NA', color: '#edd4b5', subtitle: 'Student volunteer · Hasilpur' },
];

export const trees: TreeRecord[] = [
  {
    publicId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', displayName: 'The Little Neem', species: 'Neem',
    city: 'Lahore', locationLabel: 'Lahore · approximate area', illustration: { x: 30, y: 23 },
    registeredBy: 'u-ayesha', plantedAt: '2026-03-21', firstObservedAt: '2026-03-21',
    summary: 'A little neem tree, a big promise. Our family started this green journey with one sapling and a weekly care routine.',
    status: 'Growing well',
    image: image('photo-1448375240586-882707db888b'), imageAlt: 'Illustrative photograph of a leafy green tree and forest canopy',
  },
  {
    publicId: '01ARZ3NDEKTSV4RRFFQ69G5FAW', displayName: 'Golden Amaltas', species: 'Amaltas',
    city: 'Lahore', locationLabel: 'Lahore · approximate area', illustration: { x: 38, y: 33 },
    registeredBy: 'u-sana', plantedAt: null, firstObservedAt: '2026-05-07',
    summary: 'An already-growing tree adopted by our neighborhood. We do not know the planting date, but its story starts with our first observation.',
    status: 'Established',
    image: image('photo-1473448912268-2022ce9509d8'), imageAlt: 'Illustrative photograph of a mature tree under green leaves',
  },
  {
    publicId: '01ARZ3NDEKTSV4RRFFQ69G5FAX', displayName: 'Peepal by the Path', species: 'Peepal',
    city: 'Multan', locationLabel: 'Multan · approximate area', illustration: { x: 56, y: 59 },
    registeredBy: 'u-ali', plantedAt: '2025-09-13', firstObservedAt: '2025-09-13',
    summary: 'A community tree that is becoming a favorite place to pause and appreciate the shade.',
    status: 'Growing well',
    image: image('photo-1458966480358-a0ac42de0a7a'), imageAlt: 'Illustrative photograph of tree branches with green foliage',
  },
  {
    publicId: '01ARZ3NDEKTSV4RRFFQ69G5FAY', displayName: 'Kachnar Corner', species: 'Kachnar',
    city: 'Bahawalpur', locationLabel: 'Bahawalpur · approximate area', illustration: { x: 63, y: 79 },
    registeredBy: 'u-hamza', plantedAt: '2026-01-16', firstObservedAt: '2026-01-16',
    summary: 'A school garden project where students record small changes with regular photographs.',
    status: 'Under care',
    image: image('photo-1466692476868-aef1dfb1e735'), imageAlt: 'Illustrative photograph of green saplings in a garden',
  },
  {
    publicId: '01ARZ3NDEKTSV4RRFFQ69G5FAZ', displayName: 'Jamun for Tomorrow', species: 'Jamun',
    city: 'Faisalabad', locationLabel: 'Faisalabad · approximate area', illustration: { x: 56, y: 35 },
    registeredBy: 'u-mariam', plantedAt: '2025-11-02', firstObservedAt: '2025-11-02',
    summary: 'A young jamun sapling tended by residents who share seasonal progress and care notes.',
    status: 'Growing well',
    image: image('photo-1425913397330-cf8af2ff40a1'), imageAlt: 'Illustrative photograph of a green woodland tree',
  },
  {
    publicId: '01ARZ3NDEKTSV4RRFFQ69G5FB0', displayName: 'The School Moringa', species: 'Moringa',
    city: 'Hasilpur', locationLabel: 'Hasilpur · approximate area', illustration: { x: 47, y: 83 },
    registeredBy: 'u-noor', plantedAt: '2026-05-01', firstObservedAt: '2026-05-01',
    summary: 'A sapling watched over by a class of students. Every new leaf brings excitement.',
    status: 'Newly planted',
    image: image('photo-1501004318641-b39e6451bec6'), imageAlt: 'Illustrative photograph of a small green plant',
  },
];

export const posts: TreePost[] = [
  { id:'post-neem-oct', treeId:trees[0].publicId, authorId:'u-ayesha',kind:'growth', observedAt:'2026-10-18',publishedAt:'2026-10-23T08:30:00Z',text:'Six months of growth! Look at how much fuller the leaves have become. Small moments like this make the regular watering worth it. 🌱',image:image('photo-1448375240586-882707db888b'),imageAlt:'Illustrative full green tree canopy',note:'Fresh leaves and healthy branching',seedLikes:42 },
  { id:'post-school-oct',treeId:trees[5].publicId,authorId:'u-noor',kind:'growth',observedAt:'2026-10-16',publishedAt:'2026-10-22T11:00:00Z',text:'Today our eco club compared the first planting photo with the latest one. Everyone noticed a brighter set of leaves.',image:image('photo-1501004318641-b39e6451bec6'),imageAlt:'Illustrative small green plant under indoor light',note:'New leaves noticed by students',seedLikes:28 },
  { id:'post-peepal-oct',treeId:trees[2].publicId,authorId:'u-ali',kind:'care',observedAt:'2026-10-10',publishedAt:'2026-10-21T16:00:00Z',text:'An afternoon care visit. A little mulch around the roots and a new photograph for the tree journal.',image:image('photo-1458966480358-a0ac42de0a7a'),imageAlt:'Illustrative mature green tree branches',note:'Care visit and mulch',seedLikes:35 },
  { id:'post-amaltas-sep',treeId:trees[1].publicId,authorId:'u-sana',kind:'growth',observedAt:'2026-09-26',publishedAt:'2026-10-20T09:20:00Z',text:'We adopted this Amaltas earlier this year. Its exact planting date is unknown, so we document what we can actually observe.',image:image('photo-1473448912268-2022ce9509d8'),imageAlt:'Illustrative established green tree',note:'New seasonal observation',seedLikes:31 },
  { id:'post-jamun-oct',treeId:trees[4].publicId,authorId:'u-mariam',kind:'growth',observedAt:'2026-10-01',publishedAt:'2026-10-15T12:00:00Z',text:'A seasonal snapshot of our Jamun tree. The branches seem a little stronger this month.',image:image('photo-1425913397330-cf8af2ff40a1'),imageAlt:'Illustrative green woodland',note:'Autumn follow-up',seedLikes:24 },
  { id:'post-kachnar-sep',treeId:trees[3].publicId,authorId:'u-hamza',kind:'growth',observedAt:'2026-09-16',publishedAt:'2026-10-12T10:05:00Z',text:'Our students have been checking the Kachnar regularly. This photo is our latest chapter.',image:image('photo-1466692476868-aef1dfb1e735'),imageAlt:'Illustrative garden plants',note:'Regular student check-in',seedLikes:19 },
  { id:'post-neem-aug',treeId:trees[0].publicId,authorId:'u-ayesha',kind:'growth',observedAt:'2026-08-14',publishedAt:'2026-08-15T14:00:00Z',text:'Our first big seasonal comparison. The sapling is settling in.',image:image('photo-1458966480358-a0ac42de0a7a'),imageAlt:'Illustrative green leaves and tree branches',note:'First major seasonal comparison',seedLikes:17 },
  { id:'post-school-aug',treeId:trees[5].publicId,authorId:'u-noor',kind:'care',observedAt:'2026-08-02',publishedAt:'2026-08-03T08:00:00Z',text:'We refreshed the soil and took our monthly photograph.',image:image('photo-1465146344425-f00d5f5c8f07'),imageAlt:'Illustrative fresh garden greenery',note:'Watering and soil care',seedLikes:14 },
  { id:'post-peepal-jun',treeId:trees[2].publicId,authorId:'u-ali',kind:'growth',observedAt:'2026-06-12',publishedAt:'2026-06-20T11:00:00Z',text:'Summer progress photo from our community tree.',image:image('photo-1448375240586-882707db888b'),imageAlt:'Illustrative forest tree canopy',note:'Summer observation',seedLikes:22 },
  { id:'post-amaltas-may',treeId:trees[1].publicId,authorId:'u-sana',kind:'growth',observedAt:'2026-05-07',publishedAt:'2026-05-09T09:00:00Z',text:'Our first documented photo of this existing Amaltas. Its planting date is unknown.',image:image('photo-1473448912268-2022ce9509d8'),imageAlt:'Illustrative established tree',note:'First observed, planting date unknown',seedLikes:16 },
  { id:'post-kachnar-jan',treeId:trees[3].publicId,authorId:'u-hamza',kind:'planting',observedAt:'2026-01-16',publishedAt:'2026-01-17T10:00:00Z',text:'Planting day in the school garden. This is the start of our Kachnar journey.',image:image('photo-1466692476868-aef1dfb1e735'),imageAlt:'Illustrative garden saplings',note:'Registration and planting day',seedLikes:12 },
  { id:'post-neem-mar',treeId:trees[0].publicId,authorId:'u-ayesha',kind:'planting',observedAt:'2026-03-21',publishedAt:'2026-03-22T07:00:00Z',text:'One sapling, one little promise. This is our first photograph.',image:image('photo-1465146344425-f00d5f5c8f07'),imageAlt:'Illustrative fresh green plant',note:'First day of the neem story',seedLikes:19 },
  { id:'post-jamun-nov',treeId:trees[4].publicId,authorId:'u-mariam',kind:'planting',observedAt:'2025-11-02',publishedAt:'2025-11-03T11:00:00Z',text:'A young Jamun planted with neighbors. We are making a visual history of its journey.',image:image('photo-1501004318641-b39e6451bec6'),imageAlt:'Illustrative small green plant',note:'Planting and first photograph',seedLikes:9 },
  { id:'post-school-may',treeId:trees[5].publicId,authorId:'u-noor',kind:'planting',observedAt:'2026-05-01',publishedAt:'2026-05-02T07:30:00Z',text:'Our class planted a Moringa! Next month, we will visit it for a photo update.',image:image('photo-1501004318641-b39e6451bec6'),imageAlt:'Illustrative young plant',note:'First day at school',seedLikes:11 },
  { id:'post-peepal-sep',treeId:trees[2].publicId,authorId:'u-ali',kind:'planting',observedAt:'2025-09-13',publishedAt:'2025-09-15T15:00:00Z',text:'First photo for this tree. A new neighborhood story begins.',image:image('photo-1466692476868-aef1dfb1e735'),imageAlt:'Illustrative planted greenery',note:'Tree registered',seedLikes:12 }
];

export const comments: TreeComment[] = [
  {id:'c-1',postId:'post-neem-oct',authorId:'u-sana',publishedAt:'2026-10-23T11:20:00Z',body:'Such a lovely transformation. Keep sharing your photo updates!'},
  {id:'c-2',postId:'post-neem-oct',authorId:'u-ali',publishedAt:'2026-10-23T12:00:00Z',body:'One tree at a time, the neighborhood gets greener 🌿'},
  {id:'c-3',postId:'post-school-oct',authorId:'u-ayesha',publishedAt:'2026-10-22T16:00:00Z',body:'The students must be so proud of this little tree.'},
  {id:'c-4',postId:'post-peepal-oct',authorId:'u-mariam',publishedAt:'2026-10-21T18:00:00Z',body:'Documenting the care visits is a great idea.'},
  {id:'c-5',postId:'post-amaltas-sep',authorId:'u-noor',publishedAt:'2026-10-20T12:00:00Z',body:'I love that the unknown planting date is clearly marked.'},
  {id:'c-6',postId:'post-neem-aug',authorId:'u-hamza',publishedAt:'2026-08-15T18:00:00Z',body:'Beautiful seasonal comparison.'}
];

export const notifications: Notice[] = [
  { id:'n-1',title:'Sana commented on a tree story',body:'“Such a lovely transformation.”',createdAt:'2026-10-23T11:20:00Z',postId:'post-neem-oct',icon:'message'},
  { id:'n-2',title:'A new growth photo was posted',body:'The School Moringa has a new observation.',createdAt:'2026-10-22T11:00:00Z',treeId:trees[5].publicId,icon:'camera'},
  { id:'n-3',title:'Your green community is growing',body:'Explore recent fictional tree stories in Lahore and Multan.',createdAt:'2026-10-20T09:30:00Z',icon:'leaf'},
  { id:'n-4',title:'Ali appreciated your update',body:'See the latest photo of The Little Neem.',createdAt:'2026-10-18T08:15:00Z',treeId:trees[0].publicId,icon:'heart'}
];

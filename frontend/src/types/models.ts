export type Species = 'Neem' | 'Amaltas' | 'Peepal' | 'Kachnar' | 'Jamun' | 'Moringa' | 'Unknown';
export type ObservationKind = 'planting' | 'growth' | 'care';

export interface Person {
  id: string;
  displayName: string;
  username: string;
  initials: string;
  color: string;
  subtitle: string;
}
export interface TreeRecord {
  publicId: string;
  displayName: string;
  species: Species;
  city: string;
  locationLabel: string;
  // Illustrative map layout percentages, NOT latitude/longitude and NOT a real GPS location.
  illustration: { x: number; y: number };
  registeredBy: string;
  plantedAt: string | null;
  firstObservedAt: string;
  summary: string;
  status: 'Growing well' | 'Newly planted' | 'Under care' | 'Established';
  image: string;
  imageAlt: string;
}
export interface TreePost {
  id: string;
  treeId: TreeRecord['publicId'];
  authorId: Person['id'];
  kind: ObservationKind;
  observedAt: string;
  publishedAt: string;
  text: string;
  image: string;
  imageAlt: string;
  note: string;
  seedLikes: number;
}
export interface TreeComment {
  id: string;
  postId: TreePost['id'];
  authorId: Person['id'];
  publishedAt: string;
  body: string;
}
export interface Notice {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  postId?: string;
  treeId?: string;
  icon: 'heart' | 'camera' | 'leaf' | 'message';
}

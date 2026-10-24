import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { posts, trees } from '../data/fixtures';

function open(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><AppRoutes/></MemoryRouter>);
}

afterEach(() => cleanup());

describe('Phase 01 interactive route smoke tests', () => {
  it('opens Home Feed with demo-only posts and a responsive mobile nav', () => {
    open('/');
    expect(screen.getByRole('heading',{ name:/Every tree holds/i })).toBeTruthy();
    expect(screen.getByRole('heading',{ name:/Stories from the ground/i })).toBeTruthy();
    expect(screen.getByText(/All people, trees and locations are fictional/i)).toBeTruthy();
    expect(screen.getByRole('navigation',{name:'Mobile navigation'})).toBeTruthy();
  });
  it('navigates using mobile Explore tab and displays fictional map warning', () => {
    open('/');
    const nav=screen.getByRole('navigation',{name:'Mobile navigation'});
    fireEvent.click(within(nav).getByRole('link',{name:'Explore'}));
    expect(screen.getByRole('heading',{name:'Explore tree stories'})).toBeTruthy();
    expect(screen.getByText(/non-geographic map illustration/i)).toBeTruthy();
  });
  it('displays a canonical tree profile, dated timeline and follow UI toggle', () => {
    open(`/trees/${trees[0].publicId}`);
    expect(screen.getByRole('heading',{name:trees[0].displayName})).toBeTruthy();
    expect(screen.getByRole('heading',{name:'The growth timeline'})).toBeTruthy();
    const btn=screen.getByRole('button',{name:'Follow this tree'});
    fireEvent.click(btn);
    expect(screen.getByRole('button',{name:/Following \(demo\)/}).getAttribute('aria-pressed')).toBe('true');
  });
  it('shows the same tree from a post and locally previews a comment', () => {
    open(`/posts/${posts[0].id}`);
    expect(screen.getByRole('heading',{name:posts[0].note})).toBeTruthy();
    fireEvent.change(screen.getByRole('textbox',{name:'Add a demo comment'}),{target:{value:'Lovely green progress!'}});
    fireEvent.click(screen.getByRole('button',{name:'Comment'}));
    expect(screen.getByText('Lovely green progress!')).toBeTruthy();
    expect(screen.getByText(/not saved · this session only/i)).toBeTruthy();
  });
  it('validates Add Tree form and shows a not-saved confirmation instead of persistence', () => {
    open('/add-tree');
    fireEvent.change(screen.getByRole('textbox',{name:/Give this tree a name/}),{target:{value:'My Demo Neem'}});
    fireEvent.change(screen.getByLabelText(/Photo \/ observation date/),{target:{value:'2026-10-20'}});
    fireEvent.click(screen.getByRole('button',{name:/Preview tree/}));
    expect(screen.getByText('UI preview prepared · Not saved')).toBeTruthy();
    expect(screen.getByRole('heading',{name:'My Demo Neem'})).toBeTruthy();
  });
  it('filters sample trees using Explore species dropdown', () => {
    open('/explore');
    fireEvent.change(screen.getByRole('combobox',{name:'Species filter'}),{target:{value:'Neem'}});
    const resultList = document.querySelector('.explore-results') as HTMLElement;
    expect(resultList).toBeTruthy();
    expect(within(resultList).getByRole('link',{name:/The Little Neem/})).toBeTruthy();
    expect(within(resultList).queryByRole('link',{name:/Kachnar Corner/})).toBeNull();
  });
  it('marks notification samples as read and shows zero unread', () => {
    open('/notifications');
    fireEvent.click(screen.getByRole('button',{name:/Mark all as read/}));
    expect(screen.getByText('0 unread')).toBeTruthy();
  });
  it('renders fictional profile tabs and a friendly 404 page', () => {
    const view=open('/profile');
    expect(screen.getByRole('heading',{name:'Ayesha Malik'})).toBeTruthy();
    fireEvent.click(screen.getByRole('tab',{name:'Saved posts'}));
    expect(screen.getByText('No saved demo posts')).toBeTruthy();
    view.unmount();
    open('/somewhere-unknown');
    expect(screen.getByRole('heading',{name:'That trail ends here.'})).toBeTruthy();
  });
});

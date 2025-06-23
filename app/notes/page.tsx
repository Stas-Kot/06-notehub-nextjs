import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';
import NotesClient from './Notes.client';
import { fetchNotes, GetNotesRes } from '@/lib/api';

async function Notes() {
  const queryClient = new QueryClient();

  const initialSearch = '';
  const initialPage = 1;
  const queryKey = ['notes', initialSearch, initialPage];

  await queryClient.prefetchQuery<GetNotesRes>({
    queryKey,
    queryFn: () => fetchNotes(initialSearch, initialPage),
  });

  const initialData = queryClient.getQueryData<GetNotesRes>(queryKey);

  if (!initialData) {
    throw new Error('Initial data for notes not found in cache after prefetch.');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Toaster />
      <div className={css.app}>
        <NotesClient
          initialData={initialData}
          initialSearch={initialSearch}
          initialPage={initialPage}
        />
      </div>
    </HydrationBoundary>
  );
}

export default Notes;

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import css from "./NotesPage.module.css"
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

async function Notes() {
  const queryClient = new QueryClient();
  
  const initialSearch = '';
  const initialPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ['note', initialSearch, initialPage],
    queryFn: () => fetchNotes(initialSearch, initialPage),
  });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Toaster />
        <div className={css.app}>
          <NotesClient
            initialData={queryClient.getQueryData(['note', initialSearch, initialPage])!}
            initialSearch={initialSearch}
            initialPage={initialPage}
          />
        </div>
      </HydrationBoundary>
    );
}

export default Notes;
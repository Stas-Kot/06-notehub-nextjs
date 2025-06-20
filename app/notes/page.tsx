import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import css from "./NotesPage.module.css"
import NotesClient from './Notes.client';

async function Notes() {
    const queryClient = new QueryClient();

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Toaster />
        <div className={css.app}>
          <NotesClient />
        </div>
      </HydrationBoundary>
    );
}

export default Notes;
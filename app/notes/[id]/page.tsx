import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsclient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: number }>;
};

async function NoteDetails({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsclient />
    </HydrationBoundary>
  );
}

export default NoteDetails;

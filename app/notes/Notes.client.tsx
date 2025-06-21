'use client';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/NoteModal/NoteModal';
import NoteList from '@/components/NoteList/NoteList';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, GetNotesRes } from '@/lib/api';

interface NotesClientProps {
  initialData: GetNotesRes;
  initialSearch: string;
  initialPage: number;
}

const NotesClient = ({ initialData, initialSearch, initialPage}: NotesClientProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ['note', debouncedSearch, page],
      queryFn: () => fetchNotes(debouncedSearch, page),
      initialData,
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const totalPages = data?.totalPages || 0;
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination totalPages={totalPages} onPageChange={handlePageChange} page={page} />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpen && <NoteModal onClose={closeModal}/>}
    </>
  );
};

export default NotesClient;

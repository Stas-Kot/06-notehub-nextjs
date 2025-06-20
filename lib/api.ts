import axios from 'axios';
import type { NewNote, Note } from '../types/note';

interface GetNotesRes {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const PER_PAGE = 12;

const fetchNotes = async (search: string, page: number): Promise<GetNotesRes> => {
    const response = await axios.get<GetNotesRes>('/notes', {
      params: {
        page,
        perPage: PER_PAGE,
        ...(search !== '' && { search: search }),
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data;
};

const fetchNoteById = async (id: number) => {
    const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response;
};

const deleteNote = async (noteId: number): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data;
};

const createNote = async (newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>('/notes', newNote, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data;
};

export { fetchNotes, deleteNote, createNote, fetchNoteById };

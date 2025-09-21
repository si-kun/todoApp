import { Task } from '@/types/task';
import { atom } from 'jotai';

export const taskAtom = atom([] as Task[]);
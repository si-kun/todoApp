import { Task } from '@prisma/client';
import { atom } from 'jotai';

export const taskAtom = atom([] as Task[]);
// types/global.d.ts
import type { ReactNode } from 'react';

declare module 'next' {
  export type PageProps = {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
    children?: ReactNode;
  };
}
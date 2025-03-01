// types/next.d.ts
import type { DynamicParams } from 'next/script';

declare module 'next' {
  export type PageProps = {
    params: DynamicParams;
    searchParams?: { [key: string]: string | string[] | undefined };
  };
}
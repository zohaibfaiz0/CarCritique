'use client'
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { useState } from 'react';
import { ClipboardCopy, ExternalLink, Check } from 'lucide-react';

const CodeBlock = ({ value }: any) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="my-8 overflow-hidden rounded-lg bg-gray-900 shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
        <span className="text-sm font-medium text-gray-300">
          {value.language || 'Code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-600"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <ClipboardCopy size={14} />
          )}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-gray-300">
        <code>{value.code}</code>
      </pre>
    </div>
  );
};

const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="group my-16">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900">
          <Image
            src={value.asset.url}
            alt={value.alt || 'Post image'}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={value.priority}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>
        {value.caption && (
          <figcaption className="mt-4 text-center text-sm text-gray-400">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: CodeBlock,
    callout: ({ value }: any) => {
      const typeStyles = {
        default: 'bg-gray-800/50 border-gray-500 text-gray-200',
        info: 'bg-blue-900/20 border-blue-500/50 text-blue-200',
        warning: 'bg-amber-900/20 border-amber-500/50 text-amber-200',
        success: 'bg-emerald-900/20 border-emerald-500/50 text-emerald-200',
        error: 'bg-red-900/20 border-red-500/50 text-red-200',
      };
      
      const type = value.type || 'default';
      
      return (
        <div className={`my-8 rounded-lg border-l-4 p-6 ${typeStyles[type as keyof typeof typeStyles]}`}>
          {value.title && <h4 className="mb-2 font-bold">{value.title}</h4>}
          <div className="text-lg">{value.text}</div>
        </div>
      );
    },
    video: ({ value }: any) => (
      <div className="my-16">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900">
          <iframe
            src={value.url}
            title={value.title || 'Embedded video'}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {value.caption && (
          <p className="mt-4 text-center text-sm text-gray-400">
            {value.caption}
          </p>
        )}
      </div>
    ),
    divider: () => (
      <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
    ),
    table: ({ value }: any) => (
      <div className="my-8 overflow-hidden rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800">
              <tr>
                {value.rows[0].cells.map((cell: string, i: number) => (
                  <th key={i} className="border-b border-gray-700 p-4 text-left text-sm font-semibold text-gray-200">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows.slice(1).map((row: { cells: string[] }, i: number) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                  {row.cells.map((cell: string, j: number) => (
                    <td key={j} className="border-t border-gray-700 p-4 text-sm text-gray-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  marks: {
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center font-medium text-purple-400 after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-purple-400 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
      >
        {children}
        <ExternalLink size={14} className="ml-1 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    ),
    internalLink: ({ value, children }: any) => (
      <a
        href={`/posts/${value.slug.current}`}
        className="relative font-medium text-emerald-400 after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-emerald-400 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
      >
        {children}
      </a>
    ),
    highlight: ({ children }: any) => (
      <span className="rounded bg-purple-900/30 px-1 py-0.5 text-purple-200">
        {children}
      </span>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="text-gray-200 italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-sm text-pink-300">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="relative my-12 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text pb-2 text-6xl font-black tracking-tight text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="my-8 text-4xl font-bold tracking-tight text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="my-6 text-3xl font-bold text-gray-200">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="my-4 text-2xl font-semibold text-gray-300">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="my-3 text-xl font-semibold text-gray-400">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="my-2 text-lg font-semibold text-gray-500">
        {children}
      </h6>
    ),
    normal: ({ children }: any) => (
      <p className="my-6 text-lg leading-relaxed text-gray-300 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-4 border-purple-400 bg-white/5 py-6 pl-6 pr-4 text-lg italic text-gray-300">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul className="my-6 space-y-4 pl-6 text-lg text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="my-6 list-decimal space-y-4 pl-6 text-lg text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="flex items-start space-x-2">
        <span className="text-purple-400">•</span>
        <span className="text-white">{children}</span>
      </li>
    ),
    // New blocks
    lead: ({ children }: any) => (
      <p className="my-8 text-xl font-normal leading-relaxed text-gray-200">
        {children}
      </p>
    ),
    note: ({ children }: any) => (
      <div className="my-8 rounded-lg bg-gray-800/50 p-6 text-lg text-gray-300 border border-gray-700">
        {children}
      </div>
    ),
    caption: ({ children }: any) => (
      <p className="mt-2 text-center text-sm text-gray-500">
        {children}
      </p>
    ),
    code: ({ children }: any) => (
      <pre className="my-8 overflow-x-auto rounded-lg bg-gray-900 p-6 text-sm text-gray-300">
        <code>{children}</code>
      </pre>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 space-y-3 pl-6 text-lg text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 list-decimal space-y-3 pl-6 text-lg text-gray-300">
        {children.map((child: any, i: number) => (
          <li key={i} className="pl-2">
            {child}
          </li>
        ))}
      </ol>
    ),
    checkmarks: ({ children }: any) => (
      <ul className="my-6 space-y-3 pl-6 text-lg text-gray-300">
        {children.map((child: any, i: number) => (
          <li key={i} className="flex items-start space-x-2">
            <Check size={18} className="mt-1 text-emerald-400 flex-shrink-0" />
            <span>{child}</span>
          </li>
        ))}
      </ul>
    ),
  },
};

const TableOfContents = ({ content }: { content: PortableTextBlock[] }) => {
  const headings = content.filter(
    (block) => ['h2', 'h3'].includes(block.style || '')
  );
  
  if (headings.length < 3) return null;
  
  return (
    <div className="my-12 rounded-lg border border-gray-700 bg-gray-800/30 p-6">
      <h4 className="mb-4 text-lg font-semibold text-white">Table of Contents</h4>
      <nav>
        <ul className="space-y-2 text-gray-300">
          {headings.map((heading, index) => {
            const text = heading.children?.[0]?.text || '';
            const id = text.toLowerCase().replace(/\s+/g, '-');
            const isH3 = heading.style === 'h3';
            
            return (
              <li key={index} className={isH3 ? 'ml-4' : ''}>
                <a
                  href={`#${id}`}
                  className={`hover:text-purple-400 ${isH3 ? 'text-sm' : 'font-medium'}`}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default function PortableTextComponent({ 
  value,
  showToc = true 
}: { 
  value: PortableTextBlock[];
  showToc?: boolean;
}) {
  if (!value || !Array.isArray(value)) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-6 text-center text-red-400">
        <p className="text-lg font-medium">Unable to display content</p>
        <p className="mt-2 text-sm text-red-500/70">Please check the content format and try again</p>
      </div>
    );
  }

  // Add IDs to headings for table of contents
  const contentWithIds = value.map(block => {
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style || '')) {
      const text = block.children?.[0]?.text || '';
      const id = text.toLowerCase().replace(/\s+/g, '-');
      return {
        ...block,
        _key: block._key || id,
        markDefs: [
          ...(block.markDefs || []),
          { _key: `id-${id}`, _type: 'anchor', id }
        ]
      };
    }
    return block;
  });

  return (
    <article className="mx-auto max-w-3xl px-4 pb-16">
      {showToc && <TableOfContents content={value} />}
      <PortableText value={contentWithIds} components={components} />
    </article>
  );
}
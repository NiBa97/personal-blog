"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { CoreContent } from "pliny/utils/contentlayer";
import type { Blog, Authors } from "contentlayer/generated";
import Comments from "@/components/Comments";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { BiTime, BiCalendar, BiArrowBack } from "react-icons/bi";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string; tags: string[] };
  prev?: { path: string; title: string; tags: string[] };
  children: ReactNode;
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, date, title, tags } = content;
  const basePath = path.split("/")[0];
  const [readingProgress, setReadingProgress] = useState(0);
  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-14 left-0 w-full h-0.5 z-50 bg-gray-200 dark:bg-gray-800">
        <div className="h-full bg-primary-500 transition-all duration-200" style={{ width: `${readingProgress}%` }} />
      </div>

      <article className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        {/* Back to Blog - Top */}
        <div className="mb-8">
          <Link
            href={`/${basePath}`}
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
          >
            <BiArrowBack className="mr-2" />
            Back to blog
          </Link>
        </div>

        {/* Header Section */}
        <header className="mb-16">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-gray-100">
            {title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-8">
            <div className="flex items-center gap-2">
              <BiCalendar className="w-4 h-4" />
              <time dateTime={date} className="font-medium">
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <BiTime className="w-4 h-4" />
              <span className="font-medium">5 min read</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert 
          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-primary-500 prose-a:no-underline hover:prose-a:text-primary-600
          prose-img:rounded-lg prose-img:shadow-md
          mb-16"
        >
          {children}
        </div>
        {/* Navigation */}
        <nav className=" pt-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prev && (
              <div className="group relative p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                <div className="absolute top-0 left-6 -translate-y-1/2 px-2 bg-white dark:bg-gray-900">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Previous Article</span>
                </div>
                <Link
                  href={`/${prev.path}`}
                  className="block mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors"
                >
                  ← {prev.title}
                </Link>
                <div className="flex flex-wrap gap-2">{prev.tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
              </div>
            )}

            {next && (
              <div className="group relative p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                <div className="absolute top-0 right-6 -translate-y-1/2 px-2 bg-white dark:bg-gray-900">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Next Article</span>
                </div>
                <Link
                  href={`/${next.path}`}
                  className="block mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors text-right"
                >
                  {next.title} →
                </Link>
                <div className="flex flex-wrap gap-2 justify-end">
                  {next.tags?.map((tag) => <Tag key={tag} text={tag} />)}
                </div>
              </div>
            )}
          </div>
        </nav>
        {/* Comments Section */}
        {siteMetadata.comments && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Comments</h2>
            <Comments slug={content.slug} />
          </div>
        )}
      </article>
    </div>
  );
}

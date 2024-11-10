import React from "react";
import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";

export default function Footer() {
  return (
    <footer className="relative mt-24 pb-8 pt-8">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-4">
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>{siteMetadata.author}</span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span>{`© ${new Date().getFullYear()}`}</span>
          </div>
          <div className="flex gap-6">
            Connect on
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          </div>
        </div>
      </div>
    </footer>
  );
}

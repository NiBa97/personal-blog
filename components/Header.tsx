"use client";
import React, { useState, useEffect } from "react";
import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import SearchButton from "./SearchButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`z-30 h-16 fixed w-full top-0 left-0 right-0 transition-all duration-200 ${
          isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-8">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hidden font-medium tracking-wide text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors sm:block"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Right side - Utilities */}
            <div className="flex items-center space-x-4">
              <SearchButton />
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;

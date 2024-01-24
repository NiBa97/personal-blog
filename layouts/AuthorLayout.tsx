'use client'
import { ReactNode, useEffect, useState } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { TagCloud, TagCloudOptions } from '@frank-mayer/react-tag-cloud'
import GithubRepositories from '@/components/GithubRepository'
import { FaDumbbell, FaGuitar, FaLaptopCode, FaPython } from 'react-icons/fa'
import { PiPersonSimpleBikeBold } from 'react-icons/pi'
interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  const techstack_proffesional = ['kubeflow', 'kubernetes', 'docker', 'github actions']

  const techstack_personal = ['react', 'nextjs', 'tailwindcss']

  useEffect(() => {
    console.log('AuthorLayout useEffect')
  })

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="">
          <p>
            Welcome! I'm Niklas Bauer, a tech enthusiast with a deep-rooted passion for programming
            and all things related to technology. My journey began in gymnasium, where I was first
            introduced to programming. This initial spark of interest quickly grew into a hobby, and
            before I knew it, I was immersing myself in the world of tech both professionally and in
            my spare time.
          </p>
          <br />
          <p>
            Professionally, I currently work as an MLOps Engineer at DHL IT Services in Hamburg,
            Germany. My background includes a Master of Science in Wirtschaftsinformatik (Business
            Informatics) from the Karlsruher Institut für Technologie (KIT), where I focused on data
            science, machine learning, and deep learning architectures. I've also had the
            opportunity to intern at IBM in Data Science Consulting, applying data science to
            customer projects. For over five years, I ran my own venture, NB-Web Solutions, where I
            specialized in creating new corporate websites and providing individual solutions and
            maintenance for existing ones.
          </p>
          <br />
          <p>
            On this blog, I'll be sharing my insights and experiences in the tech world. You can
            expect to read about the configurations of my home server, my thoughts on various
            hardware I use, such as monitors and keyboards, and my experiences in web development
            and machine learning. Whether you're a fellow tech enthusiast or a professional in the
            field, I hope to provide valuable content that can contribute to your own journey in
            tech.
          </p>
          <br />
          <p>Stay tuned for updates!</p>
        </div>
        <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Hobbies
        </h2>
        <div className="flex  grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center">
            <FaGuitar size="50" />
            <p>Guitar</p>
          </div>
          <div className="flex flex-col items-center">
            <FaDumbbell size="50" />
            <p>Weightlifting</p>
          </div>
          <div className="flex flex-col items-center">
            <PiPersonSimpleBikeBold size="50" />
            Cycling
          </div>
          <div className="flex flex-col items-center">
            <FaLaptopCode size="50" />
            Programming
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3"></div>
      </div>
    </>
  )
}

import NodeCache from "node-cache";
import GitHub from "github-api";
import GithubRepositories from "@/components/GithubRepository";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";
import { FaDumbbell, FaGuitar, FaLaptopCode } from "react-icons/fa";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { sortPosts, allCoreContent } from "pliny/utils/contentlayer";
import { BiBrain, BiGitBranch, BiCode } from "react-icons/bi";

import Tag from "@/components/Tag";
import { formatDate } from "pliny/utils/formatDate";
import { allBlogs } from "contentlayer/generated";

import Link from "components/Link";
const myCache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 120 });

const MAX_DISPLAY = 3;

// Define a type for repoData
export type RepoData = {
  title: string;
  stargazersCount: number;
  totalContributions: number;
  description: string;
  url: string;
};

async function getGithubData() {
  const repositories = ["vps-benchmarks", "firefox-css-custom", "personal-blog"];
  const owner = "NiBa97";
  const gh = new GitHub({
    username: process.env.GITHUB_USERNAME,
    token: process.env.GITHUB_TOKEN,
  });
  const data: Record<string, RepoData> = {};

  for (const repository of repositories) {
    let repoData: RepoData | undefined = myCache.get(`${owner}/${repository}`);

    if (!repoData) {
      const repo = gh.getRepo(owner, repository);
      const [details, contributors] = await Promise.all([repo.getDetails(), repo.getContributors()]);

      let contributions = 0;
      contributors.data.forEach((contributor) => {
        contributions += contributor.contributions;
      });

      repoData = {
        title: repository,
        stargazersCount: details.data.stargazers_count,
        totalContributions: contributions,
        description: details.data.description,
        url: details.data.html_url,
      };
      // Save data to cache
      myCache.set(`${owner}/${repository}`, repoData);
    }

    data[repository] = repoData;
  }

  return { data };
}

export default async function Home() {
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);
  const data = await getGithubData();
  return (
    <div className="mx-auto  py-12 max-w-5xl px-4">
      {/* Hero Section */}
      <div className="relative mb-16">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12">
          <div className="mt-8 md:mt-0">
            <h1 className="mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-4xl font-bold text-transparent dark:from-primary-500 dark:to-primary-300">
              Hi! I'm Niklas Bauer
            </h1>
            <p className="mb-4 text-lg leading-relaxed text-gray-800 dark:text-gray-200">
              MLOps Engineer at DHL IT Services, where I focus on building scalable machine learning solutions. During
              my master's, I explored interpretable AI for anomaly detection in multivariate time-series data.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              On this blog, I share insights about my homelab setup, review tech gear I use daily, and occasionally dive
              into ML engineering and web development topics.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://linkedin.com/in/niklas-bauer-382118172"
                className="rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
              >
                Connect on LinkedIn
              </Link>
              <Link
                href="https://github.com/NiBa97"
                className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                View Github
              </Link>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 rotate-6 transform rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-400"></div>
              <img
                src="/static/images/avatar.jpeg"
                alt="Niklas Bauer"
                className="relative w-full rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Latest Posts</h2>
          {posts.length > MAX_DISPLAY && (
            <Link href="/blog" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              All Posts &rarr;
            </Link>
          )}
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <article key={slug} className="py-6">
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <h3 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {/* Tech & Projects Section */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Professional Focus</h2>
        <div className="rounded-2xl bg-gray-50 p-6 shadow-sm dark:bg-gray-800/50">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
              <div className="mb-2 flex items-center gap-3">
                <BiBrain className="text-xl text-primary-500" />
                <h3 className="font-semibold dark:text-gray-100">Machine Learning</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Kubeflow • Python • MLOps</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
              <div className="mb-2 flex items-center gap-3">
                <BiGitBranch className="text-xl text-primary-500" />
                <h3 className="font-semibold dark:text-gray-100">DevOps</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Docker • Github Actions • K8s</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
              <div className="mb-2 flex items-center gap-3">
                <BiCode className="text-xl text-primary-500" />
                <h3 className="font-semibold dark:text-gray-100">Development</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Python • TypeScript</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">When I'm Not Coding</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="group flex items-center rounded-xl bg-gray-50 p-6 transition-colors hover:bg-primary-50 dark:bg-gray-800/50 dark:hover:bg-gray-800">
            <FaGuitar className="mr-3 h-6 w-6 text-primary-500 transition-transform group-hover:scale-110" />
            <span className="text-gray-800 dark:text-gray-200">Guitar</span>
          </div>
          <div className="group flex items-center rounded-xl bg-gray-50 p-6 transition-colors hover:bg-primary-50 dark:bg-gray-800/50 dark:hover:bg-gray-800">
            <FaDumbbell className="mr-3 h-6 w-6 text-primary-500 transition-transform group-hover:scale-110" />
            <span className="text-gray-800 dark:text-gray-200">Weightlifting</span>
          </div>
          <div className="group flex items-center rounded-xl bg-gray-50 p-6 transition-colors hover:bg-primary-50 dark:bg-gray-800/50 dark:hover:bg-gray-800">
            <PiPersonSimpleBikeBold className="mr-3 h-6 w-6 text-primary-500 transition-transform group-hover:scale-110" />
            <span className="text-gray-800 dark:text-gray-200">Cycling</span>
          </div>
          <div className="group flex items-center rounded-xl bg-gray-50 p-6 transition-colors hover:bg-primary-50 dark:bg-gray-800/50 dark:hover:bg-gray-800">
            <FaLaptopCode className="mr-3 h-6 w-6 text-primary-500 transition-transform group-hover:scale-110" />
            <span className="text-gray-800 dark:text-gray-200">Side Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}

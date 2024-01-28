import NodeCache from 'node-cache'
import GitHub from 'github-api'
import GithubRepositories from '@/components/GithubRepository'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { FaDumbbell, FaGuitar, FaLaptopCode } from 'react-icons/fa'
import { PiPersonSimpleBikeBold } from 'react-icons/pi'
import Link from 'components/Link'
const myCache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 120 })

// Define a type for repoData
export type RepoData = {
  title: string
  stargazersCount: number
  totalContributions: number
  description: string
  url: string
}

async function getGithubData() {
  const repositories = ['vps-benchmarks', 'firefox-css-custom', 'personal-blog']
  const owner = 'NiBa97'
  const gh = new GitHub({
    username: process.env.GITHUB_USERNAME,
    token: process.env.GITHUB_TOKEN,
  })
  const data: Record<string, RepoData> = {}

  for (const repository of repositories) {
    let repoData: RepoData | undefined = myCache.get(`${owner}/${repository}`)

    if (!repoData) {
      console.log('Cache miss')
      const repo = gh.getRepo(owner, repository)
      const [details, contributors] = await Promise.all([repo.getDetails(), repo.getContributors()])

      let contributions = 0
      contributors.data.forEach((contributor) => {
        contributions += contributor.contributions
      })

      repoData = {
        title: repository,
        stargazersCount: details.data.stargazers_count,
        totalContributions: contributions,
        description: details.data.description,
        url: details.data.html_url,
      }
      // Save data to cache
      myCache.set(`${owner}/${repository}`, repoData)
    }

    data[repository] = repoData
  }

  return { data }
}

export default async function Home() {
  const data = await getGithubData()
  return (
    <div>
      <div className="items-centera flex flex-row gap-4">
        <div className="avatar basis-full sm:basis-1/4">
          <img src="/static/images/avatar.jpeg" alt="avatar" className="rounded" />
        </div>
        <div className="basis-full sm:basis-3/4">
          <h1>Hi! My name is Niklas Bauer</h1>
          <p className="">
            I'm a machine learning engineering{' '}
            <Link
              href="https://group.dhl.com/de/ueber-uns/unternehmensbereiche/it-services.html"
              type="external"
            >
              @DHL IT Services
            </Link>
            with a passion for programming and a lot of things related to computers.
          </p>
          <br />
          <p>
            On this blog, you can expect details about how I've set up my home server, along with my
            opinions on different types of equipment like screens and keyboards that I use. I also
            plan to add posts about machine learning and web development in the future.
          </p>
          <br />
          <p>
            Feel free to drop me a message on{' '}
            <Link href={siteMetadata.linkedin} type="external">
              LinkedIn
            </Link>
            or to connect on{' '}
            <Link href={siteMetadata.github} type="external">
              Github
            </Link>
            !
          </p>
        </div>
      </div>
      <GithubRepositories repo_data={data} />
      <h2 className="">Technologies</h2>
      <p>
        {' '}
        At DHL I work with Kubeflow, a machine learning platform based on Kubernetes. Next to
        programming in Python, I contributed to large machine learning offerings by setting up
        custom Github Actions and Docker Container. If you are interested in my full profile, check
        out my{' '}
        <Link href={siteMetadata.linkedin} type="external">
          LinkedIn
        </Link>
        .
      </p>
      <div className="wrap flex flex-row items-center justify-center">
        <div className="sm:basis4/5 basis-full">
          <h2 className="">Hobbies</h2>
          <p className="">
            If I'm not tinkering with my homeserver or some web development project, I'm probably
            playing guitar. I also enjoy weightlifting and cycling. However, the latter is currently
            in the process of being replaced by dancing with my partner.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:basis-1/5">
          <div className="flex flex-col items-center">
            <FaGuitar size="40" />
            <p>Guitar</p>
          </div>
          <div className="flex flex-col items-center">
            <FaDumbbell size="40" />
            <p>Weightlifting</p>
          </div>
          <div className="flex flex-col items-center">
            <PiPersonSimpleBikeBold size="40" />
            Cycling
          </div>
          <div className="flex flex-col items-center">
            <FaLaptopCode size="40" />
            Programming
          </div>
        </div>
      </div>
    </div>
  )
}

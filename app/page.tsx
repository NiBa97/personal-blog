import NodeCache from 'node-cache'
import GitHub from 'github-api'
import GithubRepositories from '@/components/GithubRepository'

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
  const repositories = ['vps-benchmarks', 'firefox-css-custom']
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
      <GithubRepositories repo_data={data} />
    </div>
  )
}

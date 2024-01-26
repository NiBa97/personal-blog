'use client'
import { RepoData } from '../app/page'
import Link from './Link'
import { FaGithub } from 'react-icons/fa'
import { FaCodeCommit } from 'react-icons/fa6'
import { FaStar } from 'react-icons/fa'
import Card from './Card'
const GithubRepository = ({ repo_data }: { repo_data: RepoData }) => {
  return (
    <Card>
      <div className=" flex h-full flex-col">
        <div className="flex flex-row items-center gap-1">
          <FaGithub className="text-2xl" />
          <h3 className="text-2xl font-bold">
            <Link href={repo_data.url}>{repo_data.title}</Link>
          </h3>
        </div>
        <p>{repo_data.description}</p>
        <div className="mt-auto flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <FaCodeCommit />
            <p>{repo_data.totalContributions} commit</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <FaStar />
            <p>{repo_data.stargazersCount} stars</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
const GithubRepositories = ({
  repo_data: { data },
}: {
  repo_data: { data: Record<string, RepoData> }
}) => {
  return (
    <div>
      <h1>Github Repositories</h1>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(data).map(([key, repo_data]) => (
          <GithubRepository key={key} repo_data={repo_data} />
        ))}
      </div>
    </div>
  )
}
export default GithubRepositories

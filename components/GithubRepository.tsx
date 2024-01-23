'use client'
import { RepoData } from '../app/Main'

const GithubRepositories = ({
  repo_data: { data },
}: {
  repo_data: { data: Record<string, RepoData> }
}) => {
  return (
    <div>
      <h1>Github Repositories</h1>
      <ul>
        {Object.entries(data).map(([key, { description, stargazersCount, totalContributions }]) => (
          <li key={key}>
            <p>{key}</p>
            <p>{description}</p>
            <p>{stargazersCount}</p>
            <p>{totalContributions}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default GithubRepositories

import Redis from 'ioredis';
import { IStore, Issue, Problem } from 'src/domain/types/types';
import { v4 as uuidv4 } from 'uuid';


const LIST_PROBLEMS_KEY = "problems"
const LIST_ISSUES_KEY = "issues"

class RedisStore implements IStore {
  private client: Redis;

  constructor() {
    // Connect to Redis on port 8888
    this.client = new Redis(8888, 'localhost')
    this.client.on('error', err => console.error('Redis Client Error', err));
  }


    async debug() {
        const listPbs = await this.client.lrange(LIST_PROBLEMS_KEY, 0, -1)
        const listIssues = await this.client.lrange(LIST_PROBLEMS_KEY, 0, -1)
        return {
            listPbs: listPbs,
            listIssues: listIssues,
        }
    }


    async addIssue(issue: Issue): Promise<string> {
        if (issue.Id == "") {
            issue.Id = uuidv4()
        }
        await this.client.set(issue.Id, JSON.stringify(issue))
        await this.client.lpush(LIST_ISSUES_KEY, issue.Id)
        return issue.Id
    }

    async addProblem(pb: Problem): Promise<string> {
        if (pb.Id == "") {
            pb.Id = uuidv4()
        }
        await this.client.set(pb.Id, JSON.stringify(pb))
        await this.client.lpush(LIST_PROBLEMS_KEY, pb.Id)
        return pb.Id
    }

    async updateProblem(pb: Problem): Promise<Problem> {
        if (pb.Id == "") {
            throw new Error("unable to update problem without id")
        }

        await this.client.set(pb.Id, JSON.stringify(pb))
        return this.getProblem(pb.Id)
    }

    async getIssue(id: string): Promise<Issue> {
        let res = await this.client.get(id)
        console.log("getIssue", res)
        let issue:Issue = JSON.parse(res)
        return issue
    }
    async getProblem(id: string): Promise<Problem> {
        let res = await this.client.get(id)
        console.log("getProblem", res)
        let pb:Problem = JSON.parse(res)
        return pb
    }


    async get(id: string): Promise<string> {
        let res = await this.client.get(id)
        return res
    }


}

export const Mem = new RedisStore()
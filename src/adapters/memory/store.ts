import { IStore, Issue, Problem } from "src/domain/types/types";
import { v4 as uuidv4 } from 'uuid';


class MemoryStore implements IStore {
    private static _instance: MemoryStore;

    private static readonly issues: Issue[] = [];
    private static readonly issuesMap: { [key:string]: Issue } = {};

    private static readonly problems: Problem[] = [];
    private static readonly problemsMap: { [key:string]: Problem } = {};
    private static counter: number = 0;

    // singleton
    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    debug() {
        MemoryStore.counter++

        console.log("now issues:", MemoryStore.issues.length)
        return {
            issues: MemoryStore.issues,
            problems: MemoryStore.problems,
            count: {
                issues: MemoryStore.issues.length,
                problems: MemoryStore.problems.length,
            },
            counter: MemoryStore.counter,
        }
    }

    async addIssue(issue: Issue): Promise<string> {
        if (issue.Id == "") {
            issue.Id = uuidv4()
        }
        console.log("avant issues:", MemoryStore.issues.length)
        MemoryStore.issues.push(issue)
        MemoryStore.issuesMap[issue.Id] = issue
        console.log("apres issues:", MemoryStore.issues.length)
        return issue.Id;
    }
    async addProblem(pb: Problem): Promise<string> {
        if (pb.Id == "") {
            pb.Id = uuidv4()
        }
        MemoryStore.problems.push(pb)
        MemoryStore.problemsMap[pb.Id] = pb
        return pb.Id;
    }

    async getIssue(id: string): Promise<Issue> {
        let issue = MemoryStore.issuesMap[id]
        if (issue) {
            return issue
        }
        return Promise.reject(`can't find Issue with id ${id}`)
    }
    async getProblem(id: string): Promise<Problem> {
        let pb = MemoryStore.problemsMap[id]
        if (pb) {
            return pb
        }
        return Promise.reject(`can't find Problem with id ${id}`)
    }
}


export const Mem = new MemoryStore()
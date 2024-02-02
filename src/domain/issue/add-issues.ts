import { Mem } from "src/adapters/redis/store";
import { IStore, Issue, IssueStatus, Problem, ProblemStatus, Request } from "../types/types";
import { v4 as uuidv4 } from 'uuid';


export default async function addIssues(reqs: Request[]): Promise<Problem[]> {

    const pbs:{ [key:string]: Problem } = {};

    reqs.forEach( (r) => {
        let issue: Issue = {
            Id: uuidv4(),
            video: r.video,
            category: r.category,
            userId: r.userId,
            comment: r.comment,
            status: IssueStatus.waiting,
        }

        let groupedKey: string = r.video + r.category
        if (pbs[groupedKey]) {
            pbs[groupedKey].issues.push(issue.Id)
        } else {
            pbs[groupedKey] = {
                Id: uuidv4(),
                video: r.video,
                category: r.category,
                status: ProblemStatus.pending,
                issues: [ issue.Id ],
            }
        }

        Mem.addIssue(issue).then( (id) => {
            console.log("save issue ", id)
        })
    })

    const listPbs: Problem[] = Object.values(pbs)
    listPbs.forEach(pb => {
        Mem.addProblem(pb).then( (id) => {
            console.log("save pb ", id)
        })
    });

    return listPbs
}
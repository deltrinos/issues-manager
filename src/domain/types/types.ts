export type Request = {
 video: string;
 category: string;
 userId: number;
 comment: string;
};

export type ThirdPartyApp1 = {
 problemId: string;
 myStatus: 'running' | 'resolved';
 count: number;
 owner: 'csTeam'
};

export type ThirdPartyApp2 = {
 ProblemRef: string;
 Status: 'ongoing' | 'ended';
 IssuesCount: number;
 ExternalOwner: 'csTeam'
};


export enum IssueStatus {
    waiting = "waiting",
    grouped = "grouped",
}


export type Issue = {
    Id: string;

    video: string;
    category: string;
    userId: number;
    comment: string;
    status: IssueStatus;
};



export enum ProblemStatus {
    pending = "pending",
    ready = "ready",
    open = "open",
    closed = "closed",
}

export type Problem = {
    Id: string;
    
    status: ProblemStatus;
    video: string;
    category: string;
    issues: string[];
};



export interface IStore {
    addIssue(issue: Issue): Promise<string>;
    addProblem(pb: Problem): Promise<string>;

    getIssue(id: string): Promise<Issue>;
    getProblem(id: string): Promise<Problem>;
}


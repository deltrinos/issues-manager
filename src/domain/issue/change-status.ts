import { Mem } from "src/adapters/redis/store";
import { Problem, ProblemStatus } from "../types/types";


export default async function changeStatus(id:string, toStatus: ProblemStatus): Promise<Problem> {


    let pb = await Mem.getProblem(id)
    if (pb) {
        if (pb.status == toStatus) {
            return pb
        }

        if (
            pb.status == ProblemStatus.pending ||
            pb.status == ProblemStatus.ready && (toStatus == ProblemStatus.open || toStatus == ProblemStatus.closed) ||
            pb.status == ProblemStatus.open && toStatus == ProblemStatus.closed
        ) {
            pb.status = toStatus
        } else {
            throw new Error(`unable to change status from ${pb.status} to ${toStatus}`)
        }
        return await Mem.updateProblem(pb)
    }
    throw new Error("unable to find problem with id "+id)
}
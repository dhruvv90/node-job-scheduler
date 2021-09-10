import { Job, JobStatus } from "./job";


export class Scheduler {

    private readonly jobs: Record<string, Job>;

    constructor() {
        this.jobs = {};
    }

    addJob(job: Job): void {
        if (job.id in this.jobs) {
            throw new Error(`Job ID : ${job.id} already exists`);
        }
        this.jobs[job.id] = job;
        job.start();
    }

    getJob(id: string): Job {
        if (id in this.jobs) {
            return this.jobs[id];
        }
        throw new Error(`Job ID : ${id} does not exist`);
    }

    startJob(id: string): void {
        const job = this.getJob(id);
        job.start();
    }

    stopJob(id: string): void {
        const job = this.getJob(id);
        job.stop();
    }

    removeJob(id: string): void {
        const job = this.jobs[id];
        if (!job) {
            return;
        }
        job.stop();
        delete this.jobs[id];
    }

    stop(): void {
        Object.values(this.jobs).forEach((job) => {
            job.stop();
        });
    }

    status(): object {
        const jobList = Object.keys(this.jobs);
        const summary = {
            totalJobs: jobList.length,
        };

        const details = {};
        const activeJobs = 0, IdleJobs = 0;
        jobList.map((id) => {
            const job = this.jobs[id];
            details[id] = job.getStatus();
        })
        return summary;
    }

}
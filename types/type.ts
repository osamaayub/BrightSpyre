import { File } from "buffer"


export type FormInput={
    email:string,
    password:string
}

export type SignUpForm={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface ApplyButtonProps {
    jobId: string
    jobTitle: string
    company?: string,
    firstName?:string,
    lastName?:string,
    email?:string,
    resume?:File,
    phone?:string,
    linkedin?:string,
    coverLetter?:string
  }

  export interface PostSchemaForm{
    jobTitle:string,
    jobType:"Full-time"|"Part-time"|"Contract"|"Internship",
    location:"On-site"|"Remote"|"Hybrid",
    experienceLevel:"Entry-level"|"Mid-level"|"Senior"|"Executive",
    JobDescription:string,
    requirements:string,
    benefits:string,
    salaryMin:number,
    salaryMax:number
  }
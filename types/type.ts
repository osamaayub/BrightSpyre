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
    jobType:"full-time"|"part-time"|"contract"|"internship",
    location:"on-site"|"remote"|"hybrid",
    experienceLevel:"entry-level"|"mid-level"|"senior"|"executive",
    JobDescription:string,
    requirements:string,
    benefits:string
  }
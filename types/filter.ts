import { Key } from "react";


  export interface Filters {
    category_name: string[];
    city: string[],
    organization: string[]
    country:string[]
  }
  
  
  export type Job = {
    organization_logo:string;
    encrypted_id:string;
    description:string;
    id: string;
    title: string;
    country: string;
    city: string;
    category_name: string;
    organization: string;
    salary: number;
    job_type:string
  };
  

  export type Company={
    encrypted_id:string;
    id: Key | null | undefined;
    organization:string;
    organization_logo:string;
    city:string;
    country:string;
    positions:string;
    category_name:string;
    description:string;
    url:string
  }

  export type FilterToggles = {
    category: boolean;
    organization: boolean;
    city: boolean;
  };




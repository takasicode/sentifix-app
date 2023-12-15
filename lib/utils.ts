import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface GeneratedData {
  image: string; // Replace with the actual type of your image data
  label: string; // Replace with the actual type of your label data
}
export function convertDivision(division:string):GeneratedData{
  let data:GeneratedData = {
    label:'',
    image:''
  }
  if (division=='web') {
    data =  {label:'Website',image:'web'}
  } else  if (division=='game') {
    data =  {label:'Game',image:'game'}
  }  else  if (division=='mobile') {
    data =  {label:'Mobile',image:'mobile'}
  } else  if (division=='jaringan') {
    data =  {label:'Jaringan',image:'jaringan'}
  } else  if (division=='multimedia') {
    data =  {label:'Multimedia',image:'multimedia'}
  } else  if (division=='data') {
    data =  {label:'Data Analyst',image:'data'}
  }


  return data
}

export function capitalizeFirstChar(inputString:string) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
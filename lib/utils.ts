import { type ClassValue, clsx } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  const formatedDate = moment(date).format("MMM Do YY");
  return formatedDate;
}

export const uploadFile = async (fileToUpload, name: string) => {
  try {
    const data = new FormData();
    data.set("file", fileToUpload);
    data.set("name", name);
    const res = await fetch(`${process.env.NEXT_PUBLIC_APPURL}/api/files`, {
      method: "POST",
      body: data
    });
    console.log('file data ; ', data);

    const resData = await res.json();
    // setCid(resData.IpfsHash);
    // setUploading(false);
    return resData?.IpfsHash;
  } catch (e) {
    console.log(e);
    // setUploading(false);
    alert("Trouble uploading file");
  }
};
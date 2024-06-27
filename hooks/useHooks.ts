import { useUser } from "./queries";

export const useValidateBlog = (blogId: number) => {
    const { data: user } = useUser();

    const isValidate = user?.blogs?.some((blog) => blog.id == blogId);

    return isValidate;
};

export const useValidateComment = (id: number) => {
    const { data: user } = useUser();

    const isValidate = user?.comments?.some((c) => c.id == id);

    return isValidate;
};

export const uploadFile = async (fileToUpload, name: string) => {
    try {
        const data = new FormData();
        data.set("file", fileToUpload);
        data.set("name", name);
        const res = await fetch("/api/files", {
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

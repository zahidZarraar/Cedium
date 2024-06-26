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

export const uploadFile = async (rawFile) => {
    try {
        const res = await fetch("/api/files", {
            method: "POST",
            body: rawFile
        });
        const ipfsHash = await res.text();
        return ipfsHash;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

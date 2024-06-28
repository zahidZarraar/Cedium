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

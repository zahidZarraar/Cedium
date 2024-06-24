// hooks/useUser.ts


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async () => {
    const { data } = await axios.get('/api/me');
    return data;
};

const getBlog = async (blogId: number) => {
    const res = await fetch(`/api/blogs/${blogId}`, {
        cache: "no-cache",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => fetchUser(),
    });
};

export const useGetBlog = (blogId: number) => {
    return useQuery({
        queryKey: ['blog'],
        queryFn: async () => getBlog(blogId),
    });
};
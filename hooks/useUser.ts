// hooks/useUser.ts


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async () => {
    const { data } = await axios.get('/api/me');
    return data;
};

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => fetchUser(),
    });
};

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const saveGraph = async (graphData: any) => {
    try {
        const response = await api.post('/saveGraph', graphData);
        return response.data;
    } catch (error) {
        console.error('Error saving graph:', error);
        throw error;
    }
};

export const loadGraph = async () => {
    try {
        const response = await api.get('/loadGraph');
        return response.data;
    } catch (error) {
        console.error('Error loading graph:', error);
        throw error;
    }
};





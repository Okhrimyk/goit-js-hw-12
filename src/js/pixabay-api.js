import axios from 'axios';

const apiKey = `52950914-a47a655b15acf3b435807e601`;
axios.defaults.baseURL = 'https://pixabay.com/api/'; 

async function getImagesByQuery(query, page = 1) {
    try {
        const response = await axios.get("", {
            params: {
                key: apiKey,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 15,
                
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}; 

export { getImagesByQuery,};
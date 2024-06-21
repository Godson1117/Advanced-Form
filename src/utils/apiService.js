import axios from 'axios';

const fetchAdditionalQuestions = async (topic) => {
    try {
        const response = await axios.get(`https://survey-api-bay.vercel.app/${topic}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching survey questions:', error);
    }
};

export default fetchAdditionalQuestions;

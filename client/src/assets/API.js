import axios from 'axios';

const API = {
    getTest: () => {
        return axios.get('/api/test')
    },
    getFactories: () => {
        return axios.get('/api/getFactories')
    },
    createFactory: (name) => {
        return axios.post('/api/createFactory', {
                factoryName: name
        })
    },
    createChild: (factoryId) => {
        return axios.post('/api/createChild',{
            factoryId: factoryId
        })
    },
    deleteFactory: (factoryId) => {
        return axios.delete('/api/deleteFactory', {
            data: {
            factoryId: factoryId
        }
        })   
    },
    deleteChild: () => {
        return axios.delete('/api/deleteChild')
    },
    updateFactory: (factoryId, name, upper, lower) => {
        return axios.post('/api/updateFactory', {
            factoryId: factoryId,
            name: name,
            upper: upper,
            lower: lower
        })
    },

};



export default API;
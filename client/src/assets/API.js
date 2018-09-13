import axios from 'axios';

const API = {
    getTest: () => {
        return axios.get('/api/test')
    },
    getCollection: () => {
        return axios.get('/api/getCollection')
    },
    getDoc: (id) => {
        return axios.get('/api/getDoc', {
            docId: id
        })
    },
    createDoc: (name) => {
        return axios.post('/api/createDoc', {
                fieldName: name
        })
    },
    deleteDoc: (id) => {
        return axios.delete('/api/deleteDoc', {
            data: {
            docId: id
        }
        })   
    },
    updateDoc: (id, name) => {
        return axios.post('/api/updateDoc', {
            docId: id,
            fieldName: name
        })
    },

};



export default API;
import React from 'react'
import api from '../services/api'

export default function useRepositories() {
    
    const [repositories, setRepositories] = React.useState([])

    React.useEffect(() => {
        async function fetchRepositories() {
            try {
                const { data } = await api.get('/repositories')
                setRepositories(data || [])
            } catch(error) {
                console.log('error', error.message);
            }
        }

        fetchRepositories()
    }, [])


    async function handleLikeRepository(id) {
        const { data } = await api.post(`/repositories/${id}/like`)

        const copy = [ ...repositories ]

        const repoIndex = copy.findIndex(item => item.id === id)

        if(repoIndex > -1) {
            copy[repoIndex].likes = copy[repoIndex].likes + 1
        }

        setRepositories(copy)

    }

    return {
        //attributes
        repositories,
        //actions
        setRepositories,
        handleLikeRepository,
    }
}

import axios from 'axios'
export default function({ store, app }) {
    if(store.getters['user/auth']) {
        (async () => {
            try {
                const res = await axios.post(`${process.env.baseURL}/users/verifyToken`,{},{headers: { "Authorization" : store.getters['user/token'] }})
                app.router.push(`/admin/dashboard`)
            }catch(error) {
                store.commit('user/closeSession')
            }  
        })()
    }
}
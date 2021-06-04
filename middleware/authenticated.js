import axios from 'axios'
export default function({ store, app }) {
    if(store.getters['user/auth']) {
      (async () => {
        try {
          await axios.post(`${process.env.baseURL}/users/verifyToken`,{},{headers: { "Authorization" : store.getters['user/token'] }})
        }catch(error) {
          app.router.push(`/auth/login`)
          store.commit('user/closeSession')
        }  
      })()
    }else{
      app.router.push(`/auth/login`)
    }
  }


  


  
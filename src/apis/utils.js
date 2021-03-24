import router from '../router'


export const tip = msg => {
  alert(msg)
}
export const toLogin = () => {
  router.replace({
    name: 'Login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export const to403Page = () => {
  router.replace({
    name: '403'
  })
}


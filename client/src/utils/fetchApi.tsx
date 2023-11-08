function fetchApi(url: string): Promise<any> {
  return fetch(url)
    .then((response) => {
      console.log(response.statusText)
      return response.json().then((data) => {
        if (response.ok) {
          return {
            ok: true,
            ...data,
          }
        } else {
          return {
            ok: false,
            ...data,
          }
        }
      })
    })
    .then((responseContent) => {
      if (!responseContent.ok) {
        throw responseContent
      }
      return responseContent
    })
}

export default fetchApi

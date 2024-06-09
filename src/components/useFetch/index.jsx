import React, { useEffect, useReducer } from "react"


function fetchReducer(state, {type, data, error}) {
    switch (type) {
      case 'fetching': {
        return {data: null, error: null, loading: true}
      }
      case 'success': {
        return {data, error: null, loading: false}
      }
      case 'error': {
        return {data: null, error, loading: false}
      }
      default: {
        throw new Error(`Unsupported type: ${type}`)
      }
    }
  }
  
  export function useFetch(url) {
    const [{data, error, loading}, dispatch] = useReducer(fetchReducer, {
      data: null,
      error: null,
      loading: false,
    })
    
    useEffect(() => {
        if (!url) {
          return
        }
        
        dispatch({type: 'fetching'})
        fetch(url)
          .then(data => data.json())
          .then(data => {
            dispatch({type: 'success', data})
          })
          .catch(error => {
            dispatch({type: 'error', error})
          })
      },
      [url],
    )
  
    return [loading, error, data]
  }
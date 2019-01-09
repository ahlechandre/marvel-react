import md5 from 'md5'
import { marvel } from './env.json'

const { publicKey, privateKey } = marvel
const baseUrl = 'http://gateway.marvel.com' 

/**
 * Authentication services.
 */
export const authQueryString = ts => {
  const timestamps = ts || Date.now()
  const hash = md5(timestamps + privateKey + publicKey)

  return `ts=${timestamps}&apikey=${publicKey}&hash=${hash}`
}

/**
 * URL services.
 */
export const entityUrl = (entity, id = '', subEntity = '') => `${(
  subEntity ?
    `${baseUrl}/v1/public/${entity}/${id}/${subEntity}` :
    `${baseUrl}/v1/public/${entity}${(
      id ? `/${id}` : ''
    )}`
)}?${authQueryString()}`

export const entitiesUrl = (entity, limit = 20, offset = 0) => (
  `${baseUrl}/v1/public/${entity}?${authQueryString()}&limit=${limit}&offset=${offset}`
)

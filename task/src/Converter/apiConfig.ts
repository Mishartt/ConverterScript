// apiConfig.ts
import axios from 'axios'
const API_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_sQl1ly1tev0rQNVV19pq0Sii7egq7QuNiRxQh9kC&currencies=EUR%2CUSD%2CRUB&base_currency="; 
                
interface data{
    defaultCurrecy:string
}

export const getData = async ({defaultCurrecy}:data) => {
    console.log('fetch')
  try {
    const resp:any = await axios.get(`${API_URL}${defaultCurrecy.toLocaleUpperCase()}`).then(resp => resp.data)
    // console.log(resp.data)
    return resp.data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

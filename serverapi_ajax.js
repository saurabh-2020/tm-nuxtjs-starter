
/* ServerAPI talks REST with the backend server.
 *
 * All server communication takes place via this singleton module!
 *
 * Calls return promises.
 *
 * (Wish I could use async/await but browser support is still lacking.)
 *
 * My Python REST API server implements this simple movie API:
 * https://github.com/tomimick/restpie3
*/

import axios from "axios"

const URL_BASE = "http://localhost:8100/api/";
const URL_MOVIES = "movies/";

class ServerAPI {

    constructor() {
        this.client = axios.create({
            baseURL: URL_BASE,
            withCredentials: true, // pass cookies to cross-site api
        });
    }

    query_movies() {
        let url = URL_MOVIES;
        return this.client.get(url).then(reply => {return reply.data});
        // have a cache here so the request would not always reach server
    }

    get_movie(id) {
        let url = `${URL_MOVIES}${id}`;
        return this.client.get(url).then(reply => {return reply.data});
    }

    save_movie(item) {
        if (!item.id) {
            // create
            let url = URL_MOVIES;
            return this.client.post(url, item);
        } else {
            // update
            let url = `${URL_MOVIES}${item.id}`;
            return this.client.put(url, item);
        }
    }

    delete_movie(id) {
        let url = `${URL_MOVIES}${id}`;
        return this.client.delete(url);
    }
}

// export singleton API
const api = new ServerAPI();
export default api;


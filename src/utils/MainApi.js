export default class MainApi {
  constructor(options) {
    const { baseUrl, token = null } = options

    this._baseUrl = baseUrl.replace(/\/+$/, '')
    this._token = token;
  }

  _makeRequest(url, options) {
    options = options || {}
    const { method = "GET", body, headers = {} } = options
    let jsonBody = null;

    if (body) {
      jsonBody = JSON.stringify(body)
    }

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`
    }

    const relativeUrl = url.replace(/^\/+/, '')
    return fetch(`${this._baseUrl}/${relativeUrl}`, {
      method: method,
      body: jsonBody,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res)
        }

        return res.json()
          .then((data) => {
            return data
          })
          .catch(() => {
            return null;
          })
      });
  }

  signup(name, email, password) {
    return this._makeRequest("/signup", {
      method: "POST",
      body: {
        name: name,
        password: password,
        email: email
      }
    })
  }

  signin(email, password) {
    return this._makeRequest("/signin", {
      method: "POST",
      body: {
        password: password,
        email: email
      }
    })
  }

  signout() {
    return this._makeRequest("/signout", { method: "POST"})
  }

  getCurrentUser() {
    return this._makeRequest("/users/me", { method: "GET" })
  }

  likeMovie(movie, imageUrl, thumbnailUrl) {
    return this._makeRequest("/movies/", { 
      method: "POST",
      body: {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: imageUrl,
        trailerLink: movie.trailerLink,
        thumbnail: thumbnailUrl,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      }
    })
  }

  dislikeMovie(movieId) {
    return this._makeRequest(`/movies/${movieId}`, { method: "DELETE" })
  }

  getFavoriteMovies() {
    return this._makeRequest(`/movies/`, { method: "GET" })
  }

  updateCurrentUser(name, email) {
    return this._makeRequest(`/users/me`, { 
      method: "PATCH",
      body: {
        name: name,
        email: email
      }
    })
  }
}
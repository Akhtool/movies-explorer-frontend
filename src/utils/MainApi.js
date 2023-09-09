class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(newUserData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: newUserData.email,
        name: newUserData.name,
        password: newUserData.password,
      }),
    }).then(this._getResponseData);
  }

  login(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this._getResponseData);
  }

  refreshUserData() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  editProfile(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  getSavedMovies() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  saveMovie(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  deleteMovie(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies/${data}`, {
      method: "DELETE",
      headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
    }).then(this._getResponseData);
  }
}

const auth = new MainApi({
  baseUrl: "https://api.akhtool.movies.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;

const output = document.getElementById('output');

function getVerses() {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Token ${myAuthToken}`
  );

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const endpoint = '/v3/passage/html/'
  const myUrl = new URL(endpoint, 'https://api.esv.org')
  const qry = document.getElementById('query').value;
  const parameters = {
    'q': qry,
    'include-headings': false,
    'include-short-copyright': false,
  }

  Object.entries(parameters).forEach(
    ([name, value]) => myUrl.searchParams.set(name, value)
  );

  fetch(myUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => updatePage(result))
    .catch((error) => errorPage(error));
}

function updatePage(result) {
  const myJson = JSON.parse(String.raw`${result}`);
  const passages = myJson.passages;
  output.innerHTML = '';
  passages.forEach((p) => {
    output.innerHTML += `<div>${p}</div><hr>`;
  });
}

function errorPage(error) {
  output.innerHTML = `<div>${error}</div><hr>`;
}

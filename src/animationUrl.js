export default function AnimationUrl(id, callback) {
  fetch(`/did/url?id=${id}`)
    .then((response) => {
      response = response.json();
      return response;
    })
    .then((response) => {
      let animationUrl = response.result_url;
      callback(animationUrl);
    })
    .catch((error) => console.log(error.message));
}

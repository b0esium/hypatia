export default function AnimationId(answer, callback) {
  fetch(`/did/id?input=${answer}`)
    .then((response) => {
      response = response.json();
      return response;
    })
    .then((response) => {
      let animationId = response.id;
      callback(animationId);
    })
    .catch((error) => console.log(error.message));
}

export default function getAnswer(question, callback) {
  fetch(`/openaiapi/text?prompt=${question}`)
    .then((response) => {
      response = response.json();
      return response;
    })
    .then((response) => {
      let answer = response.choices[0].message.content;
      callback(answer);
    })
    .catch((error) => console.log(error.message));
}

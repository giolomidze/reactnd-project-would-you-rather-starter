export function formatQuestion(question, user, id) {
  const { optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = user;

  return {
    id,
    name,
    avatar: avatarURL,
    timestamp,
    text1: optionOne.text,
    text2: optionTwo.text,
  };
}

export function getQuestionInfo(users, question) {
  const author = question.author;
  const name = users[author].name;
  const avatarUrl = users[author].avatarURL;

  return {
    ...question,
    name,
    avatarUrl,
  };
}

export function getQuestionAuthor(users, question) {
  const author = question.author;
  const name = users[author].name;
  const avatarUrl = users[author].avatarURL;

  return {
    ...question,
    name,
    avatarUrl,
  };
}

export function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

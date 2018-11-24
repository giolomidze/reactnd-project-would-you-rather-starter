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

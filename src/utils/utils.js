const removePassword = (userObject) => {
  const { password, ...result } = userObject;
  return result;
};

const removePasswords = (userObjects) => {
  return userObjects.map(removePassword);
};

module.exports = {
  removePassword,
  removePasswords,
};

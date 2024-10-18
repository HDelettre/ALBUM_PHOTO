export const checkingUserData = (bodyRequest) => {
  console.log("bodyRequest : ", bodyRequest);
  // REGEX EMAIL + FIRST AND LAST NAME
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const nameRegex = /^[A-Za-zéèêùçàÉÈÊÀÙ-\s]+$/;

  // TOUS LES CHAMPS SONT REQUIS
  for (const [key, value] of Object.entries(bodyRequest)) {
    if (value === "") {
      return "Veuillez compléter tous les champs !";
    }
  }

  // CHECK EMAIL
  const checkEmail = emailRegex.test(bodyRequest.email);
  if (checkEmail !== true) {
    return "Veuillez vérifier l'adresse mail !";
  }

  // CHECK PASSWORD FORMAT
  const checkPassword = passwordRegex.test(bodyRequest.password);
  if (checkPassword !== true || bodyRequest.password.length < 8) {
    return "Veuillez vérifier le format de votre mot de passe !";
  }

  // CHECK FIRSTNAME
  const checkFirstName = nameRegex.test(bodyRequest.firstName);
  if (checkFirstName !== true) {
    return "Veuillez vérifier votre prénom !";
  }

  // CHECK LASTNAME
  const checklastName = nameRegex.test(bodyRequest.lastName);
  if (checklastName !== true) {
    return "Veuillez vérifier votre nom !";
  }

  return "valid";
};

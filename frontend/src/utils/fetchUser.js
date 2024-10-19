export const createUser = async (bodyForm) => {
  let reponseFetch = { status: "", message: "" };
  const reponse = await fetch(`${process.env.REACT_APP_API_USERS}/signup`, {
    method: "POST",
    body:bodyForm,
  });
  const reponseJSON = await reponse.json();
  reponseFetch.status = reponse.status;
  reponseFetch.message = reponseJSON.message
  return reponseFetch;
};

export const loginUser = async (bodyRequest) => {
  let reponseFetch = { status: "", message: "", data:"" };
  const reponse = await fetch(`${process.env.REACT_APP_API_USERS}/login`, {
    method: "POST",
    body: JSON.stringify(bodyRequest),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const reponseJSON = await reponse.json();
  reponseFetch.status = reponse.status;
  if (reponse.status === 200) {
    reponseFetch.data = reponseJSON;
  } else {
    reponseFetch.message = reponseJSON.message
  }
  return reponseFetch;
};

export const getAllUsers = (async () => {})();

export const getOneUser = (async (userId) => {
  const reponse = 1
})();

export const updateUser = (async () => {})();

export const deleteUser = (async () => {})();
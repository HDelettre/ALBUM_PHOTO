export const createUser = async (bodyForm) => {
  let reponseFetch = { status: "", message: "" };
  const reponse = await fetch(`${process.env.REACT_APP_API_USERS}/signup`, {
    method: "POST",
    body:bodyForm,
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    // },
  });
  
  reponseFetch.status = reponse.status;

  const reponseJSON = await reponse.json();
  reponseFetch.message = reponseJSON.message

  return reponseFetch;
};

export const loginUser = async (bodyRequest) => {};

export const getAllUsers = async () => {};

export const getOneUser = async (userId) => {};

export const updateUser = async (userId) => {};

export const deleteUser = async (userId) => {};
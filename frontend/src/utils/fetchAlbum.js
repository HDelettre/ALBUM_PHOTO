export const createAlbum = async (bodyRequest) => {};

export const getAllAlbums = async () => {
  let reponseFetch = { status: "", message: "" };
  const reponse = await fetch(`${process.env.REACT_APP_API_ALBUMS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  
  reponseFetch.status = reponse.status;
  
  const reponseJSON = await reponse.json();
if (reponse.status === 200) {
  reponseFetch.message = reponseJSON;
} else {
  reponseFetch.message = reponseJSON.message
};

  return reponseFetch;
};

export const getOneAlbum = async (albumId) => {};

export const updateAlbum = async (albumId, userId) => {};

export const deleteAlbum = async (albumId, userId) => {
  // const reponse = await fetch(
  //   `${process.env.REACT_APP_API_ALBUMS}/${resultId}`,
  //   {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   }
  // );
};

// IMPORT COMPONENTS
import { useState, useEffect } from "react";

// IMPORT COMPONENTS
import NavigationBar from "./components/navigation/NavigationBar";
import HomeContainer from "./components/home/HomeContainer";
import LoginContainer from "./components/home/LoginContainer";
import SignUpContainer from "./components/home/SignUpContainer";
import AddAlbumContainer from "./components/home/AddAlbumContainer";
import InfoBar from "./components/headerAndFooter/InfoBar";
import EditProfileContainer from "./components/home/EditProfileContainer"

// IMPORT FUNCTIONS
import { getAllAlbums } from "./utils/fetchAlbum";

function App() {
  const [allAlbumsLoading, setAllAlbumsLoading] = useState(false);
  const [allAlbums, setAllAlbums] = useState();
  const [menu, setMenu] = useState("home");
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState(
    "Connectez-vous pour profiter de toutes les options !"
  );

  useEffect(() => {
    if (allAlbumsLoading === false) {
      (async () => {
        const fetchAllAlbums = await getAllAlbums();
        if (fetchAllAlbums.status === 404) {
          setMessage(fetchAllAlbums.message);
        } else {
          setAllAlbums(fetchAllAlbums);
        }
        setAllAlbumsLoading(true);
      })();
    }
  }, [allAlbumsLoading, allAlbums]);

  return (
    <div className="appContainer">
      <NavigationBar setMenu={setMenu} />
      <div className="displayContainer">
        {allAlbumsLoading === true ? (
          <>
            <InfoBar message={message} userData={userData} setMenu={setMenu} />
            <div className="centralContainer">
              {menu === "home" ? <HomeContainer allAlbums={allAlbums} /> : ""}
              {menu === "login" ? <LoginContainer setMessage={setMessage} setUserData={setUserData} /> : ""}
              {menu === "signup" ? <SignUpContainer setMessage={setMessage} setMenu={setMenu} /> : ""}
              {menu === "createAlbum" ? <AddAlbumContainer /> : ""}
              {menu === "editProfile" ? <EditProfileContainer /> : ""}
            </div>
          </>
        ) : (
          <span className="spinloader" />
        )}
      </div>
    </div>
  );
}

export default App;

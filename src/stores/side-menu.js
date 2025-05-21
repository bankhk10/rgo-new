import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Page 1",
      },
      {
        icon: "Home",
        pathname: "/page-2",
        title: "Page 2",
      },
      {
        icon: "Home",
        pathname: "/page-3",
        title: "Page 3",
      },
      {
        icon: "Home",
        pathname: "/page-4",
        title: "Page 4",
      },
    ],
  },
});

export { sideMenu };
